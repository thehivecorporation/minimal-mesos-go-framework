import React from 'react';
import Port from './Port.jsx';
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');

class PortList extends React.Component {
    render(){
      let id = this.props.containerId;

      return(
        <List style={{backgroundColor:'#00000000'}} >
          {
            this.props.ranges.map(r => {
              return <Port key={this.props.offerId + "_" + r.begin + "_" + r.end} 
                        begin={r.begin}
                        end={r.end} />
              })
        }
        </List>
      )
    }
}

export default PortList
