import { useState } from "react";
import { Card, Button } from "react-bootstrap/esm/";
import { useNavigate } from "react-router-dom";
import DetailProduct from "./DetailProduct";
import imageNotAvailable from "../image/Image_not_available.png";

const ListProduct = ({ product, cart, setCart, user }) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const setToCart = (product) => {
    let checkOnCart = cart.find((obj) => obj.id === product.id);
    if (checkOnCart) {
      let newQty = checkOnCart.qty + 1;
      let updateQty = cart.map((obj) =>
        obj.id === product.id ? { ...obj, qty: newQty } : obj
      );
      setCart(updateQty);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          qty: 1,
        },
      ]);
    }
  };

  const addToChart = (product) => {
    if (user) {
      setToCart(product);
    } else {
      navigate("/login");
    }
  };

  const buyNow = (product) => {
    if (user) {
      setToCart(product);
      navigate("/cart/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Card key={product.id} style={{ width: "18rem" }} className="cardProduct">
        <Card.Body
          style={{ cursor: "pointer" }}
          // onClick={() => onclickDetailHandle(id)}
          onClick={() => setOpen((o) => !o)}
        >
          <Card.Img
            variant="top"
            src={
              product.images.length !== 0
                ? product.images[0]
                : imageNotAvailable
            }
          />
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{`price: $ ${product.price}`}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="mx-3"
            variant="danger"
            size="sm"
            onClick={() => addToChart(product)}
          >
            Add to Cart
          </Button>

          <Button variant="primary" size="sm" onClick={() => buyNow(product)}>
            Buy Now
          </Button>
        </Card.Footer>
      </Card>
      <DetailProduct
        // key={0 + product.id}
        open={open}
        setOpen={setOpen}
        product={product}
        cart={cart}
        setCart={setCart}
        user={user}
        addToChart={addToChart}
        buyNow={buyNow}
      />
    </>
  );
};

export default ListProduct;
