import React from "react";
import { Button } from "react-bootstrap/esm";

const NotFound = () => (
  <div className="Login">
    <div className="notFound">
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist. </p>
      <Button variant="danger" href="/">
        Back to Home
      </Button>
    </div>
  </div>
);

export default NotFound;
