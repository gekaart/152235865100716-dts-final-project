import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Instance from "../config/ApiProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ cart, logout, user }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await Instance.get("categories");
        // console.log(Res.data);
        setCategories(Res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <h3>
          <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
            My Shop
          </NavLink>
        </h3>
        <Nav className="me-auto">
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navActive" : "navInactive"
            }
          >
            Home
          </NavLink> */}
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/categories/${category.id}`}
              className={({ isActive }) =>
                isActive ? "navActive" : "navInactive"
              }
            >
              {category.name}
            </NavLink>
          ))}
        </Nav>
        <Nav className="float-end">
          {!user ? (
            <NavLink to={"/login"}>
              <FontAwesomeIcon
                style={{ marginTop: "12px", cursor: "pointer" }}
                color="grey"
                icon={faRightToBracket}
                title="Login"
              />
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "navActive" : "navInactive"
                }
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
                {cart.length ? (
                  <span
                    style={{
                      borderRadius: "100%",
                      color: "white",
                      backgroundColor: "red",
                      padding: "1px",
                      fontSize: "12px",
                    }}
                  >
                    {cart.length}
                  </span>
                ) : (
                  ""
                )}
              </NavLink>

              <FontAwesomeIcon
                style={{ marginTop: "12px", cursor: "pointer" }}
                color="grey"
                icon={faRightFromBracket}
                onClick={logout}
              />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
