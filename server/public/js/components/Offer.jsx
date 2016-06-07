/* class Offer */
import React from 'react';

//Material
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const TableRow = require('material-ui/lib/table/table-row');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');

//Components
import Port from './Port.jsx';
import PortList from './PortList.jsx';

class Offer extends React.Component {
    render(){
    	let offer = this.props.offer;
    	let resources = completeResources(offer)
    	.map(r => {
	      	switch(r.name){
	      		case "ports":
	          		return <TableRowColumn key={offer.id.value + "_portlist"}><PortList ranges={r.ranges.range} offerId={offer.id.value} /></TableRowColumn>
				case "disk":
					return <TableRowColumn key={offer.id.value + "_disk"}>{r.scalar.value}</TableRowColumn>;
				case "mem":
					return <TableRowColumn key={offer.id.value + "_mem"}>{r.scalar.value}</TableRowColumn>;
				case "cpus":
					return <TableRowColumn key={offer.id.value + "_cpus"}>{r.scalar.value}</TableRowColumn>;
	      	}
		});

	    return <TableRow key={offer.id.value + "_id"}>
	        <TableRowColumn>{offer.url.address.hostname}</TableRowColumn>
	        <TableRowColumn>{offer.url.address.ip}</TableRowColumn>
	        <TableRowColumn>{offer.url.address.port}</TableRowColumn>
	        <TableRowColumn>{offer.id.value}</TableRowColumn>
	        <TableRowColumn>{offer.framework_id.value}</TableRowColumn>
	        {resources}
	      </TableRow>
    }

}

//completeResources will take an array of resources that can contain one or more elements but
//we need a fixed amount of resources and zero-value the rest. This is what this function does
//Check that it has the 4 resources types because we can't lack any of them on the front
function completeResources(offer){
	let resourcesList = offer.resources;
      	//we create and zero value them
    	if (resourcesList.length < 4) {
    		let ports = false;
    		let disk = false;
    		let mem = false;
    		let cpus = false;

    		resourcesList.forEach(r => {
    			switch(r.name){
    				case "ports":
    					ports = true;
						break;
					case "disk":
						disk = true;
						break;
					case "mem":
						mem = true;
						break;
					case "cpus":
						cpus = true;
						break;
    			}
    		});

    		if (!cpus) {
    			resourcesList.push({name:"cpus", scalar:{value:0}});
    		} else if (!disk) {
    			resourcesList.push({name:"disk", scalar:{value:0}});
    		} else if (!mem) {
    			resourcesList.push({name:"mem", scalar:{value:0}});
    		} else if (!ports) {
    			resourcesList.push({name:"ports", ranges:{range:[]}});
    		}
    	}

	return resourcesList.sort((a,b) => {
	  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
	  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
	  if (nameA < nameB) {
	    return -1;
	  }
	  if (nameA > nameB) {
	    return 1;
	  }

	  // names must be equal
	  return 0;
	});
}

export default Offer
