import React from 'react';
const ListItem = require('material-ui/lib/lists/list-item');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
var Typography = require('material-ui/lib/styles/typography');

class Port extends React.Component {
  render(){
    let style = {padding:'8px'}
    let secondaryTextStyle= {
      fontSize: 12,
      color: Typography.textLightBlack
    };

    return(
          <ListItem style={{padding:0}} disabled={true}>
              <div style={secondaryTextStyle}>{this.props.begin}  -  {this.props.end}</div>
          </ListItem>
    );
  }
}

export default Port
