import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Instance from "../config/ApiProducts";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap/esm";

const SlickSlider = ({ user, setCart, cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("products?offset=24&limit=12");
        setProducts(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  let navigate = useNavigate();
  const onclickDetailHandle = (id) => {
    if (user) {
      navigate("/detailproduct/:" + id);
    } else {
      navigate("/login");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <div
      style={{
        margin: "50px",
        marginButtom: "400px",
        display: "block",
      }}
    >
      <h3> Maybe you like:</h3>
      <Slider {...settings}>
        {products.map((product) => (
          <Card
            key={product.id}
            style={{ width: "18rem" }}
            className="cardProduct"
          >
            <Card.Img
              variant="top"
              src={product.images}
              //   onClick={() => onclickDetailHandle(product.id)}
            />
            <Card.Body>
              <Card.Title
                className="cardTitle"
                onClick={() => onclickDetailHandle(product.id)}
              >
                {product.title}
              </Card.Title>
              <Card.Text>{`price: $ ${product.price}`}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
