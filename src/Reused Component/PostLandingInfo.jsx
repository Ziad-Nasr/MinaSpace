import "./PostLandingInfo.css";

const PostLandingCard = (props) => {
  return (
    <>
      <div className="PostLandingCardmyCard">
        <div>
          <img src={props.image} alt="map" className="PostLandingImage" />
        </div>
        <div>
          <h3 className="PostLandingTitle">{props.title}</h3>
          <p>{props.des}</p>
        </div>
      </div>
    </>
  );
};

export default PostLandingCard;
