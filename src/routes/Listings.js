import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./styles.css";
import { Button } from "react-bootstrap";
import {
  IconArticles,
} from 'assets/icons';

const products = [
  { sourse: "Google", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"3/5" },
  { sourse: "Yelp", name: "ABC Dental", address: "2101 California",phone:"111.111.1111" ,rating:"2/5"},
  { sourse: "Yahoo", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"3/5"},
  { sourse: "Foursquare", name: "ABC Dental", address: "2101 California", phone:"111.111.1111",rating:"2/5" },
  { sourse: "facebook", name: "ABC Dental", address: "2101 California" , phone:"111.111.1111" ,rating:"3/5"}
];

firebase.initializeApp({
  apiKey: "AIzaSyAmi8nAcDNVhYjJh1Fjhpu0sND-DO0aKr4",
  authDomain: "growth-plug.firebaseapp.com",
})
class Listings extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  constructor() {
    super();
    this.state = {
      isList: "NO",
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
            text: "Listed",
            formatter: this.linkList,
          },
          {
            dataField: "status",
            text: "Status",
            formatter: this.linkStatus,

          },
        {
          dataField: "action",
          text: "Action",
          formatter: this.linkUpdate,
        }
      ],
      isFollow: false,
    };
  }


  linkUpdate = ( row) => {
    return (
             <div>
             {this.state.isSignedIn ? (
               <span>
               <div>Signed In!</div>
               <Button onClick={() => firebase.auth().signOut()}
               onClick={()=>this.change()}>Sign out!
               onClick={() => {
          this.onUpdateChanged(row);
  }}</Button>
               </span>
               ) : (
                 <div>
                  <StyledFirebaseAuth
                   uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
                 </div>
             )}
           </div>
    );
  };

  linkList = () => {
    return (
             <div>
                  {this.state.isList}
              </div>
    );
  };

  linkStatus = () => {
    return (
             <div>
               <IconArticles/>
              </div>
    );
  };

  change (){
    this.setState ({
      isList:"Yes"
    })
  }


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