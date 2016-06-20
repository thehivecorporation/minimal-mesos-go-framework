FROM golang:1.6-onbuild

MAINTAINER mariocaster@gmail.com

# Install nodejs
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

WORKDIR /opt/app

ADD . /opt/app

# Go to working directory
WORKDIR /go/src/app

# RUN npm install

EXPOSE 9095

CMD app --master=zk://10.200.0.152:2181/mesos --port 9095 --hostname 0.0.0.0