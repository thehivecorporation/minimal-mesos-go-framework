package server

import (
	"net/http"

	"html/template"

	log "github.com/Sirupsen/logrus"
	gorillaWs "github.com/gorilla/websocket"
	"github.com/mesos/mesos-go/mesosproto"
)

var wsUpgrader = gorillaWs.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func New(a *string, q chan bool) {
	go Launchdispatcher()

	http.HandleFunc("/", home)

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		log.Info("Client connected")
		conn, err := wsUpgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Error("Connection with websocket client not established")
			conn.Close()
			log.Error(err)
			return
		}

		myCh := make(chan mesosproto.Offer)
		addListenerCh <- myCh

		for {
			select {
			case v := <-myCh:
				log.Infof("Offer received in client %v", v)
				conn.WriteJSON(v)
			case <-q:
				log.Info("Closing ws connection")
				removeListenerCh <- myCh
				conn.Close()
				return
			}
		}
	})

	log.Infof("Launching server on %s", *a)
	log.Fatal(http.ListenAndServe(*a, nil))
}

var addListenerCh chan chan mesosproto.Offer
var removeListenerCh chan chan mesosproto.Offer
var OfferCh chan mesosproto.Offer

func Launchdispatcher() {
	log.Info("Launching Dispatcher")
	OfferCh = make(chan mesosproto.Offer, 10)
	addListenerCh = make(chan chan mesosproto.Offer, 5)
	removeListenerCh = make(chan chan mesosproto.Offer, 5)

	listeners := make([]chan mesosproto.Offer, 0)
	for {
		select {
		case offer := <-OfferCh:
			log.Info("Offer received in dispatcher")
			for _, listener := range listeners {
				listener <- offer
			}
		case listener := <-addListenerCh:
			log.Info("Adding listener")
			listeners = append(listeners, listener)
		case listenerToRemove := <-removeListenerCh:
			log.Info("Removing listener")
			newListeners := make([]chan mesosproto.Offer, 0)
			for _, currentListener := range listeners {
				if currentListener != listenerToRemove {
					newListeners = append(newListeners, currentListener)
				} else {
					close(currentListener)
				}
			}
			listeners = newListeners
		}
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	homeTemplate.Execute(w, "ws://"+r.Host+"/ws")
}

var homeTemplate = template.Must(template.New("").Parse(`
<!DOCTYPE html>
  <head>
  <meta charset="utf-8">
    <script>
    window.addEventListener("load", function(evt) {
        var output = document.getElementById("output");
        var input = document.getElementById("input");
        var ws;
        var print = function(message) {
            var d = document.createElement("div");
            d.innerHTML = message;
            output.appendChild(d);
        };
            if (ws) {
                return false;
            }
            ws = new WebSocket("{{.}}");
            ws.onopen = function(evt) {
                print("OPEN");
            }
            ws.onclose = function(evt) {
                print("CLOSE");
                ws = null;
            }
            ws.onmessage = function(evt) {
                print("RESPONSE: " + evt.data);
            }
            ws.onerror = function(evt) {
                print("ERROR: " + evt.data);
            }
        document.getElementById("close").onclick = function(evt) {
            if (!ws) {
                return false;
            }
            ws.close();
            return false;
        };
    });
    </script>
  </head>
  <body>
    <div id="output"></div>
  </body>
</html>
`))
