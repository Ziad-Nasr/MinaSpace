import { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import "../ComponentsCSS/Add.css";
import { useFetch } from "../hooks/useFetch";
import bin from "../assets/bin.png";
import update from "../assets/gear.png";
import play from "../assets/play-button.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { productActions } from "../store/productSlice";
import { useCookies } from "react-cookie";

const Add = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["isLoggedIn"]);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    imageName: "",
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { data, error, isLoading } = useFetch(
    "https://63b02f17649c73f572cafbc3.mockapi.io/Products"
  );
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const isAdmin = useSelector((state) => state.auth.isAuth);
  const productListRedux = useSelector((state) => state.productList);

  useEffect(() => {
    if (!cookies.isLoggedIn) {
      navigator("/adminlogin");
    }
    // console.log("My Data", data);
    if (data) {
      dispatch(productActions.setNewProductList(data));
      console.log("ProductListRedux", productListRedux);
      setProductList(productListRedux);
    }
  }, [data]);

  const handleLogOut = () => {
    setCookies("isLoggedIn", false, { path: "/" });
    navigator("/");
  };

  function handleProductChange(e) {
    const { id, value, files } = e.target;

    if (id !== "image") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [id]: value,
      }));
    } else {
      if (files[0]) {
        setImage(files[0]);
        setProduct((prevProduct) => ({
          ...prevProduct,
          imageName: files[0].name,
        }));
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, price } = product;

    if (!name || !price || !image) {
      alert("Please fill out all fields");
      return;
    }

    const storageRef = ref(storage, `images/${product.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fetch("https://63b02f17649c73f572cafbc3.mockapi.io/Products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...product,
              imageUrl: downloadURL,
            }),
          })
            .then((response) => response.json())
            .then((newProduct) => {
              setProductList((prevList) => [...prevList, newProduct]);
              alert("Product added successfully");

              setProduct((prev) => ({
                ...prev,
                imageUrl: downloadURL,
              }));

              dispatch(productActions.addProduct(newProduct));
            });
        });
      }
    );
  }

  const handleDelete = async (id, name) => {
    try {
      const imageRef = ref(storage, `images/${name}`);
      await deleteObject(imageRef);
      dispatch(productActions.removeProduct(name));
    } catch (error) {
      console.log("Error deleting image from firebase storage, ", error);
    }
    fetch(`https://63b02f17649c73f572cafbc3.mockapi.io/Products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProductList((prevList) =>
        prevList.filter((product) => product.id !== id)
      );
      alert("Product deleted successfully");
    });
  };

  const handleUpdate = (productId) => {
    setSelectedProductId(productId);
    const productToUpdate = productList.find(
      (product) => product.id === productId
    );
  };

  const handleUpdateChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setProductList((prevList) =>
      prevList.map((product) => {
        if (product.id === selectedProductId) {
          return {
            ...product,
            [id]: value,
          };
        }
        return product;
      })
    );
  };

  const handleAcceptUpdate = async () => {
    const updatedProduct = productList.find(
      (product) => product.id === selectedProductId
    );

    fetch(
      `https://63b02f17649c73f572cafbc3.mockapi.io/Products/${selectedProductId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    ).then(() => {
      dispatch(productActions.updateProduct(updatedProduct));
      setSelectedProductId(null);
      alert("Product updated successfully");
    });
  };

  return (
    <>
      {productList && (
        <div
          className={
            productList.length > 0 ? "Percentage addBody" : "viewHeight addBody"
          }
        >
          <div className="d-flex justify-content-between mx-2 pt-2">
            <button
              className="btn btn-primary sticky-top"
              onClick={() => {
                navigator("/");
              }}
            >
              Return
            </button>
            <button
              className="btn btn-danger sticky-top"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
          <div className={"col-lg-12 d-flex flex-column align-items-center"}>
            <div
              className={`col-md-5 d-flex flex-column w-50 ${
                selectedProductId && selectedProductId !== product.id
                  ? "blurred"
                  : ""
              }`}
            >
              <h2 className="text-center mt-3">Add a new product</h2>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  placeholder="Enter Product Name"
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="exampleInputPrice">Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  placeholder="Price"
                  // value={product.price}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group mb-4">
                <label type="formFile" className="form-label">
                  Choose an image to upload
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image"
                  required
                  accept=".png, .jpg, .jpeg"
                  onChange={handleProductChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-1"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <br />
            <h2 className="text-center mt-4">Product List</h2>
            {!isLoading && (
              <div className="mt-4 col-8">
                {productListRedux &&
                  productList.map((product) => (
                    <div
                      className={`row align-items-center mb-4 bg-secondary rounded-5 ${
                        selectedProductId && selectedProductId !== product.id
                          ? "blurred"
                          : ""
                      }`}
                      key={product.id}
                    >
                      <div className="col-3 col-xs-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="img-fluid iconImage my-2"
                        />
                      </div>
                      {selectedProductId === product.id ? (
                        <div className="col-3 col-xs-3">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            placeholder="Enter Product Name"
                            value={product.name}
                            onChange={handleUpdateChange}
                          />
                        </div>
                      ) : (
                        <div className="col-3 col-xs-3">
                          <h4>{product.name}</h4>
                        </div>
                      )}
                      {selectedProductId === product.id ? (
                        <div className="col-3 col-xs-3">
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            placeholder="Price"
                            value={product.price}
                            onChange={handleUpdateChange}
                          />
                        </div>
                      ) : (
                        <div className="col-3 col-xs-3">
                          <h5>{product.price}</h5>
                        </div>
                      )}
                      <div className="col-3 d-flex">
                        <img
                          src={bin}
                          alt="Delete"
                          className="img-fluid icon"
                          onClick={() => {
                            handleDelete(product.id, product.name);
                          }}
                        />
                        <img
                          src={update}
                          alt="Update"
                          className="img-fluid icon ms-2"
                          onClick={() => handleUpdate(product.id)}
                        />
                        {selectedProductId === product.id && (
                          <img
                            src={play}
                            alt="Update"
                            className="img-fluid icon ms-2"
                            onClick={() => handleAcceptUpdate(product.id)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Add;
