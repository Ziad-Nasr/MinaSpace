import Box1 from "../assets/Box1.png";
import "./Block.css";
const Block = () => {
  return (
    <div>
      <img src={Box1} className="Box" />
      <div className="boxDetails">
        <h2>T-shirt printing made easy.</h2>
        <p>Create Your Design for your online business</p>
        <button className="boxButton">Create a T-shirt</button>
      </div>
    </div>
  );
};

export default Block;
