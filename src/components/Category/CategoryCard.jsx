import React from 'react'
import classes from './Category.module.css'
import { Link } from 'react-router-dom';

function CategoryCard({data}) {
    console.log(data);
    
    
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
          <img src={data.imgLink} alt="" />
          <p>Shop now</p>
        </span>
      </Link>
    </div>
  );
}

export default CategoryCard;