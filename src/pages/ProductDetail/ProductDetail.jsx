import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";

function ProductDetail() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState({}); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product data
    axios
      .get(`${productUrl}/${productId}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data); // Set product data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching product data");
        setLoading(false);
      });
  }, []); // Ensure useEffect runs when productId changes

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div>
      {product && (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </div>
  );
}

export default ProductDetail;
