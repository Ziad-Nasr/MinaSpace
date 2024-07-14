import "../ComponentsCSS/PreHeader.css";
import twitterLogo from "../assets/twitterLogo.png";
import facebookLogo from "../assets/facebookLogo.png";
import instagramLogo from "../assets/instagramLogo.png";
import youtubeLogo from "../assets/youtubeLogo.png";
import flame from "../assets/flame.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PreHeader = () => {
  const navigator = useNavigate();

  return (
    <div className="d-flex justify-content-evenly gray">
      <div className="preHeader gray">
        <div className="logoContainer d-flex">
          <img src={twitterLogo} className="logo" />
          <img src={facebookLogo} className="logo" />
          <img src={instagramLogo} className="logo" />
          <img src={youtubeLogo} className="logo" />
        </div>
        <div className="middleText d-flex ">
          <img src={flame} className="flame" />
          <p className="m-0"> Free shipping on all U.S. orders $50+</p>
        </div>
        <div className="loginSignup">
          <button className="login">Login</button>
          <button className="signup">Sign Up</button>
        </div>
      </div>
      <Button
        variant="success"
        className="shopNow"
        onClick={() => {
          navigator("/add");
        }}
      >
        Dashboard
      </Button>
    </div>
  );
};

export default PreHeader;
