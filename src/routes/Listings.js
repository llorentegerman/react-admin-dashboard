import React, { Component } from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./styles.css";
import { Button } from "react-bootstrap";

const products = [
  { sourse: "Google", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"3/5" },
  { sourse: "Yelp", name: "ABC Dental", address: "2101 California",phone:"111.111.1111" ,rating:"2/5"},
  { sourse: "Yahoo", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"3/5"},
  { sourse: "Foursquare", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"2/5" },
  { sourse: "facebook", name: "ABC Dental", address: "2101 California" , phone:"111.111.1111" ,rating:"3/5"}
];


class Listings extends Component {
  constructor() {
    super();
    this.state = {
      // For displaying data
      columns: [
        {
          dataField: "sourse",
          text: "Sourse",
          sort: true
        },
        {
          dataField: "name",
          text: "Name",

        },
        {
          dataField: "address",
          text: "Address"
        },
        {
            dataField: "phone",
            text: "Phone"
          },
          {
            dataField: "rating",
            text: "Rating"
          },
          {
            dataField: "listed",
            text: "Listed"
          },
          {
            dataField: "status",
            text: "Status"
          },
        {
          dataField: "action",
          text: "Action",
          formatter: this.linkFollow,
          sort: true
        }
      ],
      isFollow: true
    };

    this.onFollowChanged.bind(this);
  }

  onFollowChanged() {
    this.setState({ isFollow: !this.state.isFollow });
    console.log(this.state.isFollow);
  }

  linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          this.onFollowChanged(row);
        }}
      >
        Update
      </Button>
    );
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h1 className="h2">Listings</h1>
        <BootstrapTable
          keyField="sourse"
          data={products}
          columns={this.state.columns}
        />
      </div>
    );
  }
}
  export default Listings;