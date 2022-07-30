import React from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const DetailProduct = ({ open, setOpen, product }) => {
  const closeModal = () => setOpen(false);

  return (
    <>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <Button
          className="float-end"
          size="sm"
          variant="danger"
          onClick={closeModal}
        >
          <FontAwesomeIcon color="white" icon={faClose} />
        </Button>
        <div className="popup">
          <h3>Detail Product {product.title}</h3>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia,
          voluptate ea, accusamus excepturi deleniti ratione sapiente!
          Laudantium, aperiam doloribus. Odit, aut.
        </div>
      </Popup>
    </>
  );
};

export default DetailProduct;
