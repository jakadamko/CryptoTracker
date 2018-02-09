import React, { Component } from "react";
import API from "../../../utils/API";

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
  saveCrypto = (name, price) => {
    API.saveCrypto({coinName: name, coinPrice: price})
      .then(res => this.setState({ articles: res.data })
    );
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
        <a
          className="wave-effect wave-light btn"
          onClick={() => this.saveCrypto(this.state.cName, this.state.cPrice)}
        >
          Submit
        </a>
      </div>
    );
  }
}
