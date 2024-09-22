import React, { useEffect, useState } from "react";
import classes from "./Category.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import ProductCard from "../../components/Product/ProductCard";

function CategoryDetail() {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${productUrl}/category/${categoryName}`)
      .then((res) => {
        // console.log(res);
       setCategories(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <h1 style={{ padding: "30px" }}>{categoryName}</h1>
      <p style={{ padding: "30px" }}>{categories.length} results</p>
      <hr />
      <div className={classes.category_container}>
        {categories.map((category) => {
          return <ProductCard key={category.id} product={category} renderAdd={true} renderDesc={false}/>;
        })}
      </div>
    </section>
  );
}

export default CategoryDetail