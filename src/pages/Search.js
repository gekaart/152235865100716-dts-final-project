import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Navigation from "../component/Navbar";
import Instance from "../config/ApiProducts";
import ListProduct from "../component/ListProduct";

const Search = ({ cart, setCart, logout, user }) => {
  const [keyWord, setKeyWord] = useState("");
  const [products, setProducts] = useState([]);
  const [prodFilter, setProdFilter] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("products");
        setProducts(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // mengatur search
  const searchHandle = (e) => {
    setKeyWord(e.target.value);
    // console.log(keyWord);
    if (keyWord) {
      const isKeywordExist = (array, string) =>
        array.toLowerCase().includes(string);
      const prodFilter = products.filter(
        (product) =>
          isKeywordExist(product.title, keyWord) ||
          isKeywordExist(product.description, keyWord)
      );
      setProdFilter(prodFilter);
    }

    // console.log(prodFilter);
  };
  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />
      <Form style={{ margin: "100px 30px 30px 30px" }}>
        <Form.Control
          type="text"
          placeholder="Search your products here"
          onChange={searchHandle}
          value={keyWord}
        />
      </Form>
      <div className="listProduct">
        {prodFilter.map((product) => (
          <ListProduct
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
