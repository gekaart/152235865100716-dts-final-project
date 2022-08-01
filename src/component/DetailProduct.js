import React from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import imageNotAvailable from "../image/Image_not_available.png";

const DetailProduct = ({ open, setOpen, product, addToChart, buyNow }) => {
  const closeModal = () => setOpen(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Popup
        contentStyle={{ width: "700px" }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <Button
          className="float-end"
          size="sm"
          variant="danger"
          onClick={closeModal}
        >
          <FontAwesomeIcon color="white" icon={faClose} />
        </Button>
        <h3>Detail Product :</h3>
        <div className="popup">
          <div className="detailProductBody">
            <div className="detailProductImage">
              {product.images.length !== 0 ? (
                <Slider {...settings}>
                  {product.images.map((image) => (
                    <img
                      key={product.id}
                      src={image}
                      alt={`img-${product.id}`}
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  key={product.id}
                  src={imageNotAvailable}
                  alt={`img-${product.id}`}
                />
              )}
            </div>
            <div className="descriptionProduct">
              <h3>{product.title}</h3>
              <b>Descricption:</b>
              <p>{product.description}</p>
              <b>Price: </b>${product.price}
            </div>
          </div>
          <div className="detailFooter">
            <Button
              className="mx-3"
              variant="danger"
              size="sm"
              onClick={() => addToChart(product)}
            >
              Add to Cart
            </Button>

            <Button variant="primary" size="sm" onClick={() => buyNow(product)}>
              Buy Now
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default DetailProduct;
