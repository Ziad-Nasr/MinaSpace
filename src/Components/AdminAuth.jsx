import { useState } from "react";
import InputField from "../Reused Component/InpurtField";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import "../ComponentsCSS/AdminAuth.css";
import { useCookies } from "react-cookie";

const AdminAuth = () => {
  const navigator = useNavigate();
  const [iden, setIden] = useState("");
  const [password, setPassword] = useState("");

  const isAdmin = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies("isLoggedIn");
  const handleSubmit = () => {
    try {
      setCookies("isLoggedIn", true, { path: "/" });
      navigator("/Add");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AdminAuthBody d-flex flex-column justify-content-center align-items-center">
      <h1 className="AdminAuthTitle">Welcome Back!</h1>
      <h2 className="AdminAuthSubtitle">Admin View</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputs">
          <InputField
            label="Admin Identifier"
            type="text"
            placeholder="#12345"
            setValue={(e) => setIden(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            setValue={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="AdminAuthlogin">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;
