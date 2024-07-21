import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Add from "./Components/Add";
import AdminAuth from "./Components/AdminAuth";
import { useFetch } from "./hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productActions } from "./store/productSlice";
function App() {
  const { data, error, isLoading } = useFetch(
    "https://63b02f17649c73f572cafbc3.mockapi.io/Products"
  );
  const dispatch = useDispatch();
  const productListRedux = useSelector((state) => state.productList);
  useEffect(() => {
    if (data) {
      dispatch(productActions.setNewProductList(data));
    }
    console.log(productListRedux);
  }, [data]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AdminLogin" element={<AdminAuth />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
