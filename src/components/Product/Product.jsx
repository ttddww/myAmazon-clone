import React, { useEffect, useState } from 'react'
import classes from './Product.module.css'
import axios from 'axios'
import ProductCard from './ProductCard';

function Product() {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
      axios.get("https://fakestoreapi.com/products")
      .then(res => {
        // console.log(res);       
        setProducts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, [])
    
  return (
    <div className={classes.product_container}>
        {
           Products.map((singleProduct)=>{
               return <ProductCard key={singleProduct.id} product={singleProduct} />
           })
        }
    </div>
  )
}

export default Product;