import Block from "../Reused Component/Block";
import map from "../assets/map.png";
import product1 from "../assets/product1.png";
import "../ComponentsCSS/Landing.css";
import PostLandingCard from "../Reused Component/PostLandingInfo";
import Card from "../Reused Component/Cards";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Reused Component/Product";
import { useEffect, useState } from "react";

const Landing = () => {
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    fetch("https://63b02f17649c73f572cafbc3.mockapi.io/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <div className="boxes">
        <Block />
        <Block />
      </div>
      <div className="cards mt-3">
        <PostLandingCard
          image={map}
          title="Top quality"
          des="Lorem ipsum Lorem ipsum"
        />
        <PostLandingCard
          image={map}
          title="Mix and match"
          des="Lorem ipsum Lorem ipsum"
        />
        <PostLandingCard
          image={map}
          title="Shipping worldwide"
          des="Lorem ipsum Lorem ipsum"
        />
      </div>
      <Container className="mt-3">
        <Row className="mx-5">
          <Col xs={3} className="d-felx flex-column justify-content-center">
            <Card buttonTitle="Shop Hoodies" />
            <Card buttonTitle="Shop Tanktop" />
          </Col>
          <Col xs={6} className="">
            <Card buttonTitle="Shop T-shirt" />
          </Col>
          <Col xs={3} className="">
            <Card buttonTitle="Shop Sweater" />
            <Card buttonTitle="Shop Designer" />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <h1 className="text-center">Featured products</h1>
        <p className="text-center">What's more, we do it right!</p>
        <Row className="mx-5">
          {products.map((product) => {
            return (
              <div className="col-lg-3 col-md-4 cold-sm-6">
                <Product
                  img={product.imageUrl}
                  title={product.name}
                  price={product.price}
                />
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
