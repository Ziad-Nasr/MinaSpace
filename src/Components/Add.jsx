import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import "../ComponentsCSS/Add.css";
import { useFetch } from "../hooks/useFetch";
import bin from "../assets/bin.png";
import update from "../assets/gear.png";

const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0.0,
    imageUrl: "",
    imageName: "",
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const { data, error, isLoading } = useFetch(
    "https://63b02f17649c73f572cafbc3.mockapi.io/Products"
  );

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
    e.preventDefault(); // Prevent the default form submission behavior
    const { name, price } = product;
    if (!name || !price || !image) {
      alert("Please fill out all fields");
      return;
    }
    console.log(product);

    const storageRef = ref(storage, `images/${product.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload Is " + progress + "% Done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct((prevProduct) => ({
            ...prevProduct,
            imageUrl: downloadURL,
          }));

          fetch("https://63b02f17649c73f572cafbc3.mockapi.io/Products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...product,
              imageUrl: downloadURL,
            }),
          }).then((e) => {
            console.log(e);
            alert("Product added successfully");
          });
        });
      }
    );
  }

  const handleDelete = (e) => {
    e.preventDefault();
    
  }

  console.log(isLoading);
  return (
    <div className="addBody col-lg-12 d-flex flex-column align-items-center">
      <div className="col-md-5 d-flex flex-column w-50">
        <h2 className="text-center">Add a new product</h2>
        <div className="form-group my-4">
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
        <div className="form-group my-4">
          <label htmlFor="exampleInputPrice">Product Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            required
            placeholder="Price"
            value={product.price}
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
      {!isLoading && (
        <div className="mt-4 col-lg-7">
          {data.map((product) => (
            <div
              className="row align-items-center mb-4 bg-secondary rounded-5"
              key={product.id}
            >
              <div className="col-md-3 col-lg-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="img-fluid iconImage"
                />
              </div>
              <div className="col-md-3 col-lg-3">
                <h4>{product.name}</h4>
              </div>
              <div className="col-md-3 col-lg-4">
                <h5>{product.price}</h5>
              </div>
              <div className="col-md-3 col-lg-2 d-flex">
                <img src={update} alt="Update" className="img-fluid icon"/>
                <img src={bin} alt="Delete" className="img-fluid ms-2 icon" onClick={handleDelete} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Add;
