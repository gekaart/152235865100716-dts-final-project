import React, { useState } from "react";
import Navigation from "../component/Navbar";
import Footer from "../component/Footer";
import { Button, Alert } from "react-bootstrap";
import emptyCart from "../image/empty-cart.png";

const Cart = ({ cart, logout, user }) => {
  const [show, setShow] = useState(false);

  let total = 0;
  cart.map((p) => {
    console.log(p.price * p.qty);
    return (total += p.qty * p.price);
  });

  console.log(cart);

  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />
      {total === 0 ? (
        <img style={{ marginLeft: "10%" }} src={emptyCart} alt="empty-cart" />
      ) : (
        <div className="Cart">
          <h3>Here's what's in your cart:</h3>
          <ol style={{ marginTop: "20px" }}>
            {cart.map((product) => (
              <div key={product.id}>
                <li>
                  <b>{product.title}</b>
                  <br />
                  <div className="cartItems">
                    <img
                      width={120}
                      src={product.image}
                      alt={`img-${product.id}`}
                    />
                    <div style={{ marginLeft: "20%", marginTop: "5px" }}>
                      Price: ${product.price}
                      <br />
                      Quantity: {product.qty} pcs
                    </div>
                    <b style={{ marginLeft: "20%", marginTop: "5px" }}>
                      Subtotal : ${product.price * product.qty}
                    </b>
                  </div>
                </li>
                <hr />
              </div>
            ))}
          </ol>
          <h3 style={{ marginLeft: "65%" }}>Total Price ${total}</h3>
          {!show ? (
            <Button
              style={{ marginLeft: "65%" }}
              variant="danger"
              onClick={() => setShow(true)}
            >
              Checkout
            </Button>
          ) : (
            ""
          )}

          <Alert style={{ marginTop: "30px" }} show={show} variant="success">
            <Alert.Heading>Thank's for shopping at MyShop</Alert.Heading>
            <p>
              Your purchase will be processed immediately, please make a payment
              to the account xxxx.xxxx.xxx for ${total}..-
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button href="/" variant="outline-danger">
                Approved
              </Button>
            </div>
          </Alert>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
