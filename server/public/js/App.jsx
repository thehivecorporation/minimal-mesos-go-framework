import React from 'react';
import { connect } from 'react-redux';
import OfferList from './components/OfferList.jsx'
const Paper = require('material-ui/lib/paper');
const AppBar = require('material-ui/lib/app-bar');
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');
const IconButton = require('material-ui/lib/icon-button');

class App extends React.Component {
  render() {
    let style = {margin: "10px 5px 10px 5px"}
    if(this.props.length === 0){
      return (
        <Paper zDepth={2} style={style}>
          <p>Loading data from server...</p>
        </Paper>
      );

    } else {
      return (
        <div>
          <AppBar
            title="Apache Mesos Real Time Offer Visualizer"
            iconElementLeft={<Avatar src="public/img/mesos-logo.jpg"></Avatar>}
            iconElementRight={
              <IconButton tooltip="GitHub" style={{padding:"0px"}} onFocus={function(e){
                  window.open("http://github.com/thehivecorporation/real-time-mesos-offers");
                }}>
                <Avatar src="public/img/github.png" />
              </IconButton>
              }
          />
        <OfferList offers={this.props.offers} />
        </div>
      );
    }
  }
}

function select(state){
  return state;
}

export default connect(select)(App)
