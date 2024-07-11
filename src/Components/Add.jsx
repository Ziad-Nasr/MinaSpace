import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import "../ComponentsCSS/Add.css";
const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
    imageName: "",
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
    console.log(product);

    const storageRef = ref(storage, `images/${image.name}`);
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
          console.log(product.imageUrl);
          console.log("File available at", downloadURL);
        });
      }
    );
    fetch("https://63b02f17649c73f572cafbc3.mockapi.io/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((e) => {
      console.log(e);
      alert("Product added successfully");
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center addBody">
      <div className="col-md-5">
        <h2 className="text-center">Add a new product</h2>
        <div className="form-group my-4">
          <label htmlFor="exampleInputEmail1">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Product Name"
            onChange={handleProductChange}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="exampleInputPrice">Password</label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Price"
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
            accept=".png, .jpg, .jpeg"
            onChange={handleProductChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Add;
