import React, { useEffect } from "react";
import "../styles/cardStyle.css";
import '../styles/viewModalStyle.css';
import { useDispatch,useSelector } from "react-redux";
import { deleteProducts, showProducts } from "../features/productDetails";

const ViewModal = ({ isOpen, onClose, productId}) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const {products,loading} = useSelector((state) => state.app);
  const product = products.filter((product) => product.id === productId);
  useEffect(() => {
    dispatch(showProducts());
  }, []);
  console.log(product)
  const {title,price,description,type,image} = product[0];

  // const title="Product Details";
  // const price=122;
  // const description='awdas dasd a sd ad ad asd';
  // const type='electronic';
  // const imageLink="https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";


  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <img className="modal-image" src={image} alt={title} />
        <label>Price:</label>
        <div>{price}</div>
        <label>Description:</label>
        <div>{description}</div>
        <label>Type:</label>
        <div>{type}</div>
      </div>
    </div>
  );
};

const Card = ({ product ,onEdit}) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const [productId, setProductId ] = React.useState();
  
  const openModal=(id)=>{
    setIsOpen(true);
    setProductId(id);
  }
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);

  const editModal=(id)=>{
    onEdit(id);
  }
  const deleteProduct=(id)=>{
    const isconfirmed=window.confirm("Are you sure you want to delete this product?");
    if(isconfirmed){
      dispatch(deleteProducts(id));
    }
    else{
      return;
    }
  }

  return (
    <div>

    
    <ViewModal isOpen={isOpen} onClose={() => setIsOpen(false)} productId={productId} />
    <div className="card-containers">
    <div className="image">
    <img
    src={product.image?product.image:"https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"}
    alt=""
    />
    </div>
    <div className="cardflex">
    <div className="title">
    <p>{product.title.substring(0,10)}</p>
    </div>
    <div className="price">
    <p>₹{product.price}</p>
    </div>
    </div>
    
    <div className="desc">
    <p>{product.description.substring(0, 35)}</p>
    </div>
    
    <button className="btn-view"  onClick={()=>{openModal(product.id)}}>View</button>
    <button className="btn-update" onClick={()=>{editModal(product.id)}} >Update</button>
    <button className="btn-delete" onClick={()=>{deleteProduct(product.id)}}>Delete</button>
    </div>
    </div>
    );
};

export default Card;
