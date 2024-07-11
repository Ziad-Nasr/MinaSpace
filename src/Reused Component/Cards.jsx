import { Button } from "react-bootstrap";
import hoodies from "../assets/hoodies.png";
import "./Cards.css";
const Card = (props) => {
  return (
    <>
      <div className="mb-4">
        <div className="cardContainer">
          <img src={hoodies} alt="Hoodies" className="cardsImage" />
          <Button
            variant="light"
            className="BSButton d-flex justify-content-center"
            size="lg"
          >
            {props.buttonTitle}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Card;
