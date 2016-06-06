import React from 'react';
const Card = require('material-ui/lib/card/card');
const Avatar = require('material-ui/lib/avatar');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const Table = require('material-ui/lib/table/table');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableBody = require('material-ui/lib/table/table-body');
import Colors from 'material-ui/lib/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class OfferList extends React.Component {
  render(){
    let offers = this.props.offers;

    let offerList = offers.map(offer => {

    	let rawResources = offer.resources;
    	//Check that it has the 4 resources types
    	if (rawResources.length < 4) {
    		//Some resource is not exposed in the offer, zero-value it
    		let ports = false;
    		let disk = false;
    		let mem = false;
    		let cpus = false;

    		rawResources.forEach(r => {
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
    			rawResources.push({name:"cpus", scalar:{value:0}});
    		} else if (!disk) {
    			rawResources.push({name:"disk", scalar:{value:0}});
    		} else if (!mem) {
    			rawResources.push({name:"mem", scalar:{value:0}});
    		} else if (!ports) {
    			rawResources.push({name:"ports", ranges:{range:[]}});
    		}
    	}

    	let resources = rawResources.sort((a,b) => {
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
    	}).map(r => {
	      	switch(r.name){
	      		case "ports":
	      			return <TableRowColumn>
	      				{r.ranges.range.map(range => {
		      				return range.begin + "-" + range.end
	      				}).join(", ")}
      				</TableRowColumn>;
	      			
	    			case "disk":
    					return <TableRowColumn>{r.scalar.value}</TableRowColumn>;
	    			case "mem":
	    				return <TableRowColumn>{r.scalar.value}</TableRowColumn>;
	    			case "cpus":
	    				return <TableRowColumn>{r.scalar.value}</TableRowColumn>;
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
    });

    return(
        <Card style={this.props.style}>
          <CardHeader
            title="Title"
            subtitle="Subtitle"
            avatar={<Avatar src="img/container.jpg"></Avatar>}
            />

            <Table
              fixedHeader={true}
              fixedFooter={true}
              selectable={false}>
              <TableHeader enableSelectAll={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>URL Address Hostname</TableHeaderColumn>
                  <TableHeaderColumn>URL Address IP</TableHeaderColumn>
                  <TableHeaderColumn>URL Address Port</TableHeaderColumn>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>FrameworkID</TableHeaderColumn>
                  <TableHeaderColumn>Resources: CPU's</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Disk (Mb)</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Mem (Mb)</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Ports</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                >

                {offerList}

              </TableBody>
            </Table>
        </Card>
    );
  }
}

export default OfferList;
