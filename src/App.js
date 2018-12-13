import React, { Component } from "react";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import Header from "./component/Header/Header";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      selected: [],
      isEdit: false
    };
    this.getInventory = this.getInventory.bind(this);
  }

  componentDidMount() {
    this.getInventory();
  }

  getInventory() {
    axios.get("/api/inventory").then(res => {
      this.setState({ inventory: res.data });
    });
  }

  selectedItem = (id, name, price, image_url) => {
    let selectedItem = {
      id: id,
      image_url: image_url,
      name: name,
      price: price
    };
    this.setState({
      selected: selectedItem
    });
  };

  isEditing = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  updateItem = (id, image_url, name, price) => {
    axios
      .put(`/api/product/${id}`, { id, image_url, name, price })
      .then(res => {
        this.getInventory();
      });
  };

  resetSelected = () => {
    this.setState({
      selected: []
    });
  };

  render() {
    console.log("this.state.selected", this.state.selected);
    return (
      <div className="App">
        <Dashboard
          inventory={this.state.inventory}
          getInventory={this.getInventory}
          selectedItem={this.selectedItem}
          isEdit={this.state.isEdit}
          isEditing={this.isEditing}
        />
        <Form
          getInventory={this.getInventory}
          selected={this.state.selected}
          isEdit={this.state.isEdit}
          isEditing={this.isEditing}
          updateItem={this.updateItem}
          resetSelected={this.resetSelected}
        />
        <Header />
      </div>
    );
  }
}

export default App;
