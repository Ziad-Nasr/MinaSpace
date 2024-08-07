import Block from "../Reused Component/Block";
import map from "../assets/map.png";
import product1 from "../assets/product1.png";
import "../ComponentsCSS/Landing.css";
import PostLandingCard from "../Reused Component/PostLandingInfo";
import Card from "../Reused Component/Cards";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Reused Component/Product";
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

const Landing = () => {
  // const { data, error, isLoading } = useFetch(
  //   "https://63b02f17649c73f572cafbc3.mockapi.io/Products"
  // );

  const productListRedux = useSelector((state) => state.productList);
  // const dataLen = data ? data.length : 0;
  const memoizedProducts = useMemo(() => {
    if (productListRedux) {
      return productListRedux.map((product) => ({
        id: product.id,
        img: product.imageUrl,
        title: product.name,
        price: product.price,
      }));
    }
    return [];
  }, []);

  return (
    <div>
      <div className="boxes">
        <Block />
        <Block />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-4">
            <PostLandingCard
              image={map}
              title="Top quality"
              des="Lorem ipsum Lorem ipsum"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-4">
            <PostLandingCard
              image={map}
              title="Mix and match"
              des="Lorem ipsum Lorem ipsum"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-4">
            <PostLandingCard
              image={map}
              title="Shipping worldwide"
              des="Lorem ipsum Lorem ipsum"
            />
          </div>
        </div>
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
          {productListRedux.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 cold-sm-6">
              <Product
                img={product.imageUrl}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
