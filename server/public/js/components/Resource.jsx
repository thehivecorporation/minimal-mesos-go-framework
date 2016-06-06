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

class Resource extends React.Component {
  render(){
    let offer = this.props.offer;
    let rows = [];

    console.log(offer);

    rows.push(
      <TableRow key={offer.id.value + "_id"}>
        <TableRowColumn>ID</TableRowColumn>
        <TableRowColumn>{offer.id.value}</TableRowColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={offer.id.value + "_hostname"}>
        <TableRowColumn>URL Address Hostname</TableRowColumn>
        <TableRowColumn>{offer.url.address.hostname}</TableRowColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={offer.id.value + "_address_ip"}>
        <TableRowColumn>URL Address IP</TableRowColumn>
        <TableRowColumn>{offer.url.address.ip}</TableRowColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={offer.id.value + "_address_port"}>
        <TableRowColumn>URL Address Port</TableRowColumn>
        <TableRowColumn>{offer.url.address.port}</TableRowColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={offer.id.value + "_framework_id"}>
        <TableRowColumn>Framework ID</TableRowColumn>
        <TableRowColumn>{offer.framework_id.value}</TableRowColumn>
      </TableRow>
    );

    return(
        <Card style={this.props.style} initiallyExpanded={false}>
          <CardHeader
            title={offer.hostname}
            subtitle={offer.slave_id.value}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={<Avatar src="img/container.jpg"></Avatar>}
            />

            <Table
              height='300px'
              fixedHeader={true}
              fixedFooter={true}
              expandable={true}
              selectable={false}>
              <TableHeader enableSelectAll={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn tooltip='Property'>Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Value'>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                >

                {rows}

              </TableBody>
            </Table>
        </Card>
    );
  }
}
// class Resource extends React.Component {
//   render(){
//     let offer = this.props.offer;
//     let rows = [];
//     let portInfo;
//
//     for (var key in offer) {
//       if (offer.hasOwnProperty(key)) {
//         //Non empty info
//         if (offer[key] != '' && offer[key] != null) {
//           if( key == 'Ports' ) {
//             rows.push(
//               <TableRow key={offer.Id + key + "_row"}>
//                 <TableRowColumn>{key}</TableRowColumn>
//                 <TableRowColumn>
//                   <ResourcePortList ports={offer['Ports']} offerId={offer.Id} />
//                 </TableRowColumn>
//               </TableRow>
//             );
//
//             portInfo = offer.Ports.map(p => {
//               return p.IP + ":" + p.PublicPort + "->" + p.PrivatePort + "/" + p.Type + " ";
//             }).toString();
//
//
//           } else {
//             rows.push(
//               <TableRow key={offer.Id + key + "_row"}>
//                 <TableRowColumn>{key}</TableRowColumn>
//                 <TableRowColumn>
//                   {offer[key]}
//                 </TableRowColumn>
//               </TableRow>
//             );
//           }
//         }
//       }
//     }
//     return(
//         <Card style={this.props.style} initiallyExpanded={false}>
//           <CardHeader
//             title={this.props.offer.Names}
//             subtitle={portInfo}
//             actAsExpander={true}
//             showExpandableButton={true}
//             avatar={<Avatar src="img/offer.jpg"></Avatar>}
//             />
//
//             <Table
//               height='300px'
//               fixedHeader={true}
//               fixedFooter={true}
//               expandable={true}
//               selectable={false}>
//               <TableHeader enableSelectAll={false} displaySelectAll={false}>
//                 <TableRow>
//                   <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
//                   <TableHeaderColumn tooltip='The Status'>Status</TableHeaderColumn>
//                 </TableRow>
//               </TableHeader>
//               <TableBody
//                 displayRowCheckbox={false}
//                 showRowHover={true}
//                 >
//
//                 {rows}
//
//               </TableBody>
//             </Table>
//         </Card>
//     );
//   }
// }

export default Resource;
