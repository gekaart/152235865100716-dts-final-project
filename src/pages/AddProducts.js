import React, { useState, useEffect } from "react";
import Navigation from "../component/Navbar";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import Instance from "../config/ApiProducts";
import Paginate from "../component/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddProducts = ({ cart, logout, user }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // const [linkImages, setLinkImages] = useState([]);

  const [totalData, setTotalData] = useState(0);
  const [showForm, setShowForm] = useState("False");
  const [flag, setFlag] = useState(true);
  const [inputData, setInputData] = useState({
    id: "",
    title: "",
    category: { id: "", name: "", image: "" },
    description: "",
    price: "",
    images: [],
  });

  async function fetchData() {
    try {
      const response = await Instance.get("products?offset=0&limit=12");
      setProducts(response.data);
      const response1 = await Instance.get("products");
      setTotalData(response1.data.length);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("categories/");
        setCategories(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //   Mengatur Halaman

  const limit = 12;
  const totalPages = Math.ceil(totalData / limit);

  const handlePageClick = async (data) => {
    let offset = data.selected * limit;
    const productsFromServer = await fetchPages(offset, limit);
    setProducts(productsFromServer.data);
  };

  const fetchPages = async (offset, limit) => {
    const res = await Instance.get(`products?offset=${offset}&limit=${limit}`);
    return res;
  };

  const editHandle = (
    id,
    title,
    catId,
    catName,
    catImage,
    description,
    price,
    images
  ) => {
    setInputData({
      id: id,
      title: title,
      category: { id: catId, name: catName, image: catImage },
      description: description,
      price: price,
      images: images,
    });

    setShowForm("Update");
  };

  const updateData = async () => {
    try {
      const response = await Instance.put("products/" + inputData.id, {
        title: inputData.title,
        category: inputData.category,
        description: inputData.description,
        price: inputData.price,
        images: inputData.images,
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
      const response = await Instance.post("products/", {
        title: inputData.title,
        categoryId: inputData.category.id,
        description: inputData.description,
        price: inputData.price,
        images: inputData.images,
      });
      setFlag(true);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandle = () => {
    if (showForm === "Update") {
      // console.log(inputData);
      updateData();
      setFlag(!flag);
      setInputData({
        id: "",
        title: "",
        category: { id: "", name: "", image: "" },
        description: "",
        price: "",
        images: [],
      });
    }
    if (showForm === "Submit") {
      submitData();
      setFlag(!flag);
      setInputData({
        id: "",
        title: "",
        category: { id: "", name: "", image: "" },
        description: "",
        price: "",
        images: [],
      });
    }
    console.log(showForm);
  };

  const addHandle = () => {
    setShowForm("Submit");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [flag]);

  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />;
      <div className="AddProduct">
        <h3>List Products</h3>
        {showForm !== "False" ? (
          <div className="FormInput">
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        title: e.target.value,
                      })
                    }
                    value={inputData.title}
                    size="sm"
                    type="text"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Category
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    size="sm"
                    onChange={(e) => {
                      let cat = e.target.value.split("|");
                      setInputData({
                        ...inputData,
                        category: {
                          id: parseInt(cat[1]),
                          name: cat[0],
                          image: cat[2],
                        },
                      });
                    }}
                    aria-label="Default select example"
                  >
                    <option
                      value={
                        inputData.category.name +
                        "|" +
                        inputData.category.id +
                        "|" +
                        inputData.category.image
                      }
                    >
                      {inputData.category.name}
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={
                          category.name +
                          "|" +
                          category.id +
                          "|" +
                          category.image
                        }
                      >
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={inputData.description}
                    size="sm"
                    as="textarea"
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        description: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-2">
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    value={inputData.price}
                    size="sm"
                    type="number"
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        price: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Link Images
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={inputData.images}
                    size="sm"
                    as="textarea"
                    onChange={(e) => {
                      let images = e.target.value.split(",");
                      setInputData({
                        ...inputData,
                        images: images,
                      });
                    }}
                  />
                  <span style={{ color: "red", fontSize: "10px" }}>
                    Please spread the link images with comma (,)
                  </span>
                  {/* <Form.Control
                    onChange={(e) => {
                      setLinkImages([...linkImages, e.target.value]);
                      console.log(linkImages);
                      setInputData({
                        ...inputData,
                        images: linkImages,
                      });
                    }}
                    value={inputData.images[0]}
                    size="sm"
                    type="text"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setLinkImages([...linkImages, e.target.value]);
                      setInputData({
                        ...inputData,
                        images: linkImages,
                      });
                    }}
                    value={inputData.images[1]}
                    size="sm"
                    type="text"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setLinkImages([...linkImages, e.target.value]);
                      setInputData({
                        ...inputData,
                        images: linkImages,
                      });
                    }}
                    value={inputData.images[2]}
                    size="sm"
                    type="text"
                  /> */}
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
                onClick={() => setShowForm("False")}
              >
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={addHandle}>
            Add Product
          </Button>
        )}
        <div className="ProductTable">
          <Table striped bordered hover>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Images</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, num) => (
                <tr key={product.id}>
                  <td>{num + 1}</td>
                  <td style={{ display: "flex" }}>
                    {product.images.map((img, num) => (
                      <img width="100px" src={img} alt={num} key={num} />
                    ))}
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category.name}</td>
                  <td>{product.description}</td>
                  <td>$.{product.price}</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() =>
                        editHandle(
                          product.id,
                          product.title,
                          product.category.id,
                          product.category.name,
                          product.category.image,
                          product.description,
                          product.price,
                          product.images
                        )
                      }
                      title="Edit"
                      icon={faEdit}
                    />{" "}
                    <FontAwesomeIcon title="Delete" icon={faTrash} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate handlePageClick={handlePageClick} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default AddProducts;
