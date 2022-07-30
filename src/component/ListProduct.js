import { useState } from "react";
import { Card, Button } from "react-bootstrap/esm/";
import { useNavigate } from "react-router-dom";
import DetailProduct from "../pages/DetailProduct";

const ListProduct = ({ product, cart, setCart, user }) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  // const onclickDetailHandle = (id) => {
  //   if (user) {
  //     navigate("/detailproduct/:" + id);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const addToChart = (product) => {
    if (user) {
      setCart([...cart, product.id]);
    } else {
      navigate("/login");
    }
  };

  const buyNow = (product) => {
    if (user) {
      navigate("/cart/:" + product.id);
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
          <Card.Img variant="top" src={product.images} />
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
      />
    </>
  );
};

export default ListProduct;
