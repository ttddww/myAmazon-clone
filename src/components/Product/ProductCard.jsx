import React, { useContext } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormater from "../CurrencyFormater/CurrencyFormater";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [{ basket }, dispatch] = useContext(DataContext);
  // console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };
  return (
    <section
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "800px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* count */}
          <span>{rating.count}</span>
        </div>
        <div>
          {/* price */}
          <CurrencyFormater amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </section>
  );
}

export default ProductCard;
