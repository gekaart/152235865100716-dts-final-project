import React from "react";
import Navigation from "../component/Navbar";

const AddCategories = ({ cart, logout, user }) => {
  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />
      <div style={{ marginTop: "150px" }}>Add Categories</div>;
    </>
  );
};

export default AddCategories;
