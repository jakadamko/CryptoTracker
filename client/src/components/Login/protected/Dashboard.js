import React, { Component } from "react";
import API from "../../../utils/API";
import firebase from '../../config/constants';

export default class Dashboard extends Component {
  state = {
    cName: "",
    cPrice: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveCrypto = (name, price, uid) => {
    API.saveCrypto({coinName: name, coinPrice: price, uid})
    .then(this.setState({cName: "", cPrice: ""}))
  }


  render() {

    const uid = firebase.auth().currentUser.uid

    return (
      <div className="col m3">
        <label>Crypto Name</label>
        <input
          value={this.state.cName}
          onChange={this.handleInputChange}
          name="cName"
        />
        <label>Crypto Price</label>
        <input
          value={this.state.cPrice}
          onChange={this.handleInputChange}
          name="cPrice"
        />
        <a
          className="wave-effect wave-light btn"
          onClick={() => this.saveCrypto(this.state.cName, this.state.cPrice, uid)}
        >
          Submit
        </a>
      </div>
    );
  }
}
