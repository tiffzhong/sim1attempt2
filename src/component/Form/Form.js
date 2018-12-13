import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      image_url: ""
    };
    this.addItem = this.addItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.selected) {
        this.setState({
          name: this.props.selected.name,
          price: this.props.selected.price,
          image_url: this.props.selected.image_url
        });
      }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleReset = () => {
    this.setState({
      name: "",
      price: 0,
      image_url: ""
    });
  };

  addItem() {
    const { image_url, name, price } = this.state;
    axios.post("/api/product", { name, price, image_url }).then(res => {
      this.props.getInventory();
    });
  }

  render() {
    console.log("changing", this.props.selected);
    const { isEdit, isEditing, updateItem } = this.props;
    return (
      <div className="form">
        <div className="form-image-container">
          <img
            src={
              this.state.image_url ||
              "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
            }
            alt="url"
          />
        </div>

        <label>Image URL: </label>
        <input
          name="image_url"
          value={this.state.image_url}
          onChange={this.handleChange}
        />
        <label>Product Name: </label>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label>Price: </label>
        <input
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
        />

        <button onClick={this.handleReset}>Cancel</button>
        {/* if edit is false  */}
        {!isEdit ? (
          <button onClick={this.addItem}>Add to Inventory</button>
        ) : (
          <button
            onClick={() => {
              updateItem(
                this.props.selected.id,
                this.state.image_url,
                this.state.name,
                this.state.price
              );
              isEditing();
              this.handleReset();
              this.props.resetSelected();
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    );
  }
}

export default Form;
