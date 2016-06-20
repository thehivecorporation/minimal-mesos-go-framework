FROM jamesgroat/golang-nodejs

MAINTAINER mariocaster@gmail.com

# Go to working directory
WORKDIR /go/src/app

# Install dependencies
RUN git clone https://github.com/thehivecorporation/real-time-mesos-offers.git .
RUN go get ./...
RUN go build -o app
RUN npm install

CMD ./app --master=zk://10.200.0.152:2181/mesos --port 9095 --hostname 0.0.0.0