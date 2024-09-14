import React from "react";
import classes from './Product.module.css'
import { Link, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating'
import CurrencyFormater from "../CurrencyFormater/CurrencyFormater";

function ProductCard({ product }) {
  const { image, title, id, rating, price, description } = product;

  return (
    <section className={`${classes.card_container} ${classes.product_flexed}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
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
        <button className={classes.button}>Add to Cart</button>
      </div>
    </section>
  );
}

export default ProductCard;
