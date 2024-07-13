import "./Product.css";

const Product = (props) => {
  return (
    <>
      <div className="productContainer">
        <img
          src={props.img}
          alt="Product Image"
          className="mb-3 productImage"
        />
        <h4>{props.title}</h4>
        <h5>{props.price}$</h5>
      </div>
    </>
  );
};
export default Product;
