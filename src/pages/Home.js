import React from "react";
import Navigation from "../component/Navbar";
import Slider from "../component/Slider";
import ListProduct from "../component/ListProduct";
import { useEffect, useState } from "react";
import Instance from "../config/ApiProducts";
import Paginate from "../component/Pagination";
import SlickSlider from "../component/SlickSlider";
import ListCategories from "../component/ListCategories";
import Footer from "../component/Footer";

const Home = ({ cart, setCart, logout, user }) => {
  const [products, setProducts] = useState([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("products?offset=0&limit=12");
        setProducts(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //   Mengatur Halaman
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Instance.get("products");
        setTotalData(response.data.length);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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

  // mengatur search

  return (
    <div className="Home">
      <Navigation cart={cart} logout={logout} user={user} />
      <Slider />
      <SlickSlider cart={cart} setCart={setCart} user={user} />
      <ListCategories />
      <h3
        style={{
          marginLeft: "50px",
        }}
      >
        All Product:
      </h3>
      <div className="listProduct">
        {products.map((product) => (
          <ListProduct
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
            user={user}
          />
        ))}
      </div>
      <Paginate handlePageClick={handlePageClick} totalPages={totalPages} />
      <Footer />
    </div>
  );
};

export default Home;
