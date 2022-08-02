import React from "react";
import Navigation from "../component/Navbar";

const AddProducts = ({ cart, logout, user }) => {
  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />;
      <div style={{ MarginTop: "50px" }}>Add Product</div>
    </>
  );
};

export default AddProducts;
