import React from "react";

function Product(props) {
  let {
    id,
    name,
    price,
    image_url,
    deleteItem,
    selectedItem,
    isEditing
  } = props;
  console.log("props", props);
  return (
    <div className="product-container">
      {image_url ? (
        <img src={image_url} alt={name} />
      ) : (
        <img
          src="https://www.scottsoutdoors.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/image-placeholder.jpg"
          alt={name}
        />
      )}
      <h3>Name: {name}</h3>
      <h5>Price: ${price}</h5>
      <button onClick={() => deleteItem(id)}>Delete</button>

      <button
        onClick={() => {
          selectedItem(id, name, price, image_url);
          isEditing();
        }}
      >
        Edit
      </button>
    </div>
  );
}
export default Product;
