import React from "react";
import classes from "./Category.module.css";
import { CategoryInfo } from "./CategoryInfo";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <div className={classes.category_container}>
      {CategoryInfo.map((Info,index) => {
        return <CategoryCard key={index} data={Info}/>;
      })}
    </div>
  );
}

export default Category;
