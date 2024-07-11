import Emerald from "../assets/Emerald.jpg";
import star from "../assets/star.png";
import bag from "../assets/bag.png";
import "../ComponentsCSS/Header.css";
import ReactSearchBox from "react-search-box";

const Header = () => {
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  return (
    <div className="Header">
      {/* <div className="midHeader"></div> */}
      <ul className="Items">
        <li className="item Mint">Home</li>
        <li className="item">MinaSpace</li>
        <li className="item">Shop</li>
        <li className="item">Blog</li>
        <li className="item">Pages</li>
      </ul>
      <div className="imageTitle">
        <img src={Emerald} className="Emerald" />
        <p className="Mina">Mina Space</p>
      </div>
      <div className="rightTitle">
        <ReactSearchBox
          leftIcon={<>🔍</>}
          placeholder="Search..."
          value="Doe"
          data={data}
          callback={(record) => console.log(record)}
        />
        <img src={star} className="logo" />
        <img src={bag} className="logo" />
      </div>
    </div>
  );
};

export default Header;
