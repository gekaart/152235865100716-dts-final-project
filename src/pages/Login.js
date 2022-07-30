import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({
  emailOnchageHandler,
  passwordOnchageHandler,
  loginHandle,
  credential,
  emailError,
  passwordError,
}) => {
  return (
    <div className="Login">
      <h3>Form Login</h3>
      <Form>
        <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              required
              type="text"
              value={credential.email}
              placeholder="email@example.com"
              onChange={emailOnchageHandler}
            />
            <p style={{ fontSize: "12px", color: "red" }}>{emailError}</p>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={credential.password}
              onChange={passwordOnchageHandler}
            />
            <p style={{ fontSize: "12px", color: "red" }}>{passwordError}</p>
          </Col>
        </Form.Group>

        <Button
          size="sm"
          variant="outline-dark"
          style={{ width: "220px", marginLeft: "80px" }}
          onClick={loginHandle}
        >
          Login
        </Button>
      </Form>
      <p className="mt-2">
        Don't have account? please{" "}
        <Link style={{ textDecoration: "none", color: "red" }} to="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
