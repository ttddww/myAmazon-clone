import React from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Category from '../../components/Category/Category';
import Product from '../../components/Product/Product';

function Home() {
  return (
    <>
      <Carousel/>
      <Category/>
      <Product/>
    </>
  )
}

export default Home;