import React from 'react';

//Material
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

//Components
import PortList from './PortList.jsx';
import Offer from './Offer.jsx';


class OfferList extends React.Component {
  render(){
    let offers = this.props.offers;

    let offerList = offers.map(offer => {
      return <Offer offer={offer} key={offer.id.value} />  
    });

    return(
        <Card style={this.props.style}>
          <CardHeader title="Offers" subtitle="Max offers 20"
            avatar={<Avatar src="public/img/container.jpg"></Avatar>}
            />

            <Table fixedHeader={true} fixedFooter={true} selectable={false}>
              <TableHeader enableSelectAll={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>URL Address Hostname</TableHeaderColumn>
                  <TableHeaderColumn>URL Address IP</TableHeaderColumn>
                  <TableHeaderColumn>URL Address Port</TableHeaderColumn>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>FrameworkID</TableHeaderColumn>
                  <TableHeaderColumn>Resources: CPUs</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Disk (Mb)</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Mem (Mb)</TableHeaderColumn>
                  <TableHeaderColumn>Resources: Ports</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true} >

                {offerList}

              </TableBody>
            </Table>
        </Card>
    );
  }
}

export default OfferList;
