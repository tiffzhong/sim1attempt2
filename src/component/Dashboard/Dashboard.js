import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";

class Dashboard extends Component {
  deleteItem = id => {
    axios.delete(`/api/product/${id}`).then(res => {
      this.props.getInventory();
    });
  };

  render() {
    const displayInventory = this.props.inventory.map(product => {
      console.log("DI", this.props);

      return (
        <div className="dashboard">
          <Product
            image_url={product.image_url}
            key={product.id}
            price={product.price}
            name={product.name}
            id={product.id}
            deleteItem={this.deleteItem}
            selectedItem={this.props.selectedItem}
            isEdit={this.props.isEdit}
            isEditing={this.props.isEditing}
          />
        </div>
      );
    });

    return (
      <div className="Dashboard">
        Dashboard
        {displayInventory}
      </div>
    );
  }
}

export default Dashboard;
