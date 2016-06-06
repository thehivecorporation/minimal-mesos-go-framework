import React from 'react';
import PortRange from './PortRange.jsx';

const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

class ResourceList extends React.Component {
    render(){
      let id = this.props.containerId;


      let resources = this.props.resources.map(r => {
      	switch(r.name){
      		case "ports":
      			return <TableRowColumn><PortRange ports={r} key={id + "_ports"} /></TableRowColumn>
      			break;
    			case "disk":
    				break;
    			case "mem":
    				break;
    			case "cpu":
    				break;
    			default:
    				break;
      	}
      });

      return(
        <List
          subheader="List of resources"
          subHeaderStyle={{height:'15px'}}
          style={{backgroundColor:'#00000000'}} //Transparent
          subheaderStyle={{height:'30px'}}
          >
          {resources}
        </List>
      )
    }
}

export default ResourceList
