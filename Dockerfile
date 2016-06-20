FROM jamesgroat/golang-nodejs

MAINTAINER mariocaster@gmail.com

# Go to working directory
WORKDIR /go/src/app

# Install front packages
RUN npm install

CMD app --master=zk://10.200.0.152:2181/mesos --port 9095 --hostname 0.0.0.0