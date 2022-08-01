import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap/esm";
import Instance from "../config/ApiProducts";
import "reactjs-popup/dist/index.css";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("categories");
        setCategories(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h3
        style={{
          marginLeft: "50px",
        }}
      >
        List Categories:
      </h3>
      <div className="ListCategories">
        {categories.map((category) => (
          <Card
            key={category.id}
            style={{ width: "18rem" }}
            className="cardProduct"
          >
            <Card.Img
              variant="top"
              src={category.image}
              onClick={() => navigate("/categories/" + category.id)}
            />
            <Card.Body>
              <Card.Title
                className="cardTitle"
                onClick={() => navigate("/categories/" + category.id)}
              >
                {category.name}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ListCategories;
