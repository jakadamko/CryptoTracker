import React, { Component } from "react";
import API from "../../../utils/API";

export default class Dashboard extends Component {
  state = {
    cName: "",
    cPrice: null
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    API.saveCrypto(
      this.state.cName,
      this.state.cPrice,
    ).then(res => this.setState({ articles: res.data }));
  };

  render() {
    return (
      <div>
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
        <button onClick={() => this.handleFormSubmit(this.state.cName, this.state.cPrice)}>Submit</button>
      </div>
    );
  }
}
