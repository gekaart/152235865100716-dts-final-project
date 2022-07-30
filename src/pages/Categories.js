import React, { useEffect, useState } from "react";
import Navigation from "../component/Navbar";
import Instance from "../config/ApiProducts";
import { useParams } from "react-router-dom";
import ListProduct from "../component/ListProduct";
import Footer from "../component/Footer";

const Categories = ({ cart, setCart, logout, user }) => {
  const [productByCategories, setproductByCategories] = useState([]);
  const [category, setCategory] = useState([]);
  let params = useParams();

  // ambil data produk untuk setiap kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await Instance.get(`categories/${params?.id}/products`);
        // console.log(Res.data);
        setproductByCategories(Res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params]);

  // Ambil data kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await Instance.get(`categories/${params?.id}`);
        // console.log(Res.data);
        setCategory(Res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params]);

  // let navigate = useNavigate();
  // const onclickDetailHandle = (id) => {
  //   if (user) {
  //     navigate("/detailproduct/:" + id);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // const buyNowHandle = (product) => {
  //   if (user) {
  //     setCart([...cart, product.id]);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <>
      <Navigation cart={cart} logout={logout} user={user} />
      <h3 style={{ margin: "100px 0px 50px 50px" }}>
        Product by Category {category.name} :
      </h3>
      <div className="listProduct">
        {productByCategories.map((product) => (
          <ListProduct
            product={product}
            cart={cart}
            setCart={setCart}
            user={user}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
