import React, { useEffect, useState } from "react";
import Navigation from "../component/Navbar";
import Instance from "../config/ApiProducts";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddCategories = ({ cart, logout, user }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState("False");
  const [flag, setFlag] = useState(true);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const response = await Instance.get("categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const response = await Instance.put("categories/" + inputData.id, {
        name: inputData.name,
        image: inputData.image,
      });
      setFlag(true);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const submitData = async () => {
    try {
      const response = await Instance.post("categories/", {
        name: inputData.name,
        image: inputData.image,
      });
      setFlag(true);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandle = async (id) => {
    try {
      const response = await Instance.delete("categories/" + id);

      setFlag(true);
      console.log(response);
      console.log(id);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const addHandle = () => {
    setShowForm("Submit");
  };

  const submitHandle = () => {
    if (showForm === "Update") {
      // console.log(inputData);
      updateData();
      setFlag(!flag);
      setInputData({
        id: "",
        name: "",
        image: "",
      });
    }
    if (showForm === "Submit") {
      submitData();
      setFlag(!flag);
      setInputData({
        id: "",
        name: "",
        image: "",
      });
    }
    console.log(showForm);
  };

  const editHandle = (id, name, image) => {
    setInputData({ id: id, name: name, image: image });
    setShowForm("Update");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [flag]);

  // console.log(categories);
  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />
      <h3 style={{ margin: "100px 30px 30px 30px" }}>Add Categories</h3>
      {showForm !== "False" ? (
        <Form style={{ margin: "0px 30px 0px 50px" }} className="col-md-6 mb-5">
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    name: e.target.value,
                  })
                }
                value={inputData.name}
                size="sm"
                type="text"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    image: e.target.value,
                  })
                }
                value={inputData.image}
                size="sm"
                type="text"
              />
            </Col>
          </Form.Group>
          <Button
            className="float-end mt-2"
            variant={showForm === "Update" ? "warning" : "primary"}
            size="sm"
            onClick={submitHandle}
          >
            {showForm}
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            className="float-end mt-2"
            variant="secondary"
            size="sm"
            onClick={() => {
              setShowForm("False");
              setInputData({
                id: "",
                name: "",
                image: "",
              });
            }}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <Button
          style={{ marginLeft: "50px" }}
          variant="primary"
          size="sm"
          onClick={addHandle}
        >
          Add Catogory
        </Button>
      )}
      <div style={{ margin: "0px 30px 30px 50px" }} className="AddCategories">
        <div className="ProductTable">
          <Table striped bordered hover>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Name</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, num) => (
                <tr key={category.id}>
                  <td>{num + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <img
                      width="100px"
                      src={category.image}
                      alt={num}
                      key={num}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() =>
                        editHandle(category.id, category.name, category.image)
                      }
                      title="Edit"
                      icon={faEdit}
                    />{" "}
                    <FontAwesomeIcon
                      onClick={() => deleteHandle(category.id)}
                      title="Delete"
                      icon={faTrash}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
