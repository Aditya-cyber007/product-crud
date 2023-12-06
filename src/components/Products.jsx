import React, { useEffect } from "react";
import Card from "./card";
import "../styles/productStyle.css";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { createProducts, showProducts } from "../features/productDetails";
const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleSave = () => {
    const products = {
      "title": title,
      "price": price,
      "description": description,
      "type": type,
      "image": imageLink,

    };

    onSave(products);
    setTitle("");
    setPrice("");
    setDescription("");
    setType("");
    setImageLink("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Product Details</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label>Image Link:</label>
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

const Products = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Product Title",
    price: 0,
    description: "Product Description",
    type: "Product Type",
    imageLink: "https://example.com/image.jpg",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const dispatch = useDispatch();

  const handleSave = (products) => {
    setModalData(products);
    console.log("Saving data:", products);
    dispatch(createProducts(products));
  };

  const {products,loading} = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showProducts());
  }, []);

  return (
    <div>
      {loading&&<h1>Products loading</h1>}
      <button style={{ marginLeft: "25px" }} onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={modalIsOpen} onClose={closeModal} onSave={handleSave} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
