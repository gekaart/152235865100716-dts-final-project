import React from "react";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Instance from "../config/ApiProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faRightFromBracket,
  faRightToBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ cart, logout, user }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await Instance.get("categories");
        const Cat = Res.data.filter((e) => e.id < 6);
        // console.log(categories);
        setCategories(Cat);
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
              {user.email === "admin@gmail.com" ? (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user.email.split("@")[0]}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/addProducts">
                    Add Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/addCategories">
                    Add Categories
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <b
                  style={{
                    color: "white",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  {user.email.split("@")[0]}
                </b>
              )}
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? "navActive" : "navInactive"
                }
              >
                <FontAwesomeIcon icon={faSearch} />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "navActive" : "navInactive"
                }
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
                {cart.length ? (
                  <Badge pill bg="danger">
                    {cart.length}
                  </Badge>
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
