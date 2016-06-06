import store from './store.jsx'
import {REFRESH_REQUEST, REFRESH_FAILED, REFRESH_SUCCESS } from './actions.jsx';
import { refreshRequest, refreshFailed, refreshSuccess, newOffer } from './actions.jsx';

//TODO Port must be defined from server so a template is required probably.
const url = 'ws://localhost:9095/ws';
let socket = new WebSocket(url);

socket.onopen = ()  => {
  store.dispatch(refreshRequest())
};
socket.onclose = () => { console.log("Socket closed..."); };

socket.onmessage = msg => {
  let json = JSON.parse(msg.data);
  json.timestamp = Date.now();
  store.dispatch(newOffer(json))
}

export default socket;
