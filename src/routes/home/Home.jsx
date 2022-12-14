import React from 'react'
import HeroBanner from '../../components/hero-banner/HeroBanner'
import Products from '../../components/products/Products'

export default function Home({ setactiveCart }) {
  return (
    <>
      <HeroBanner />
      <Products setactiveCart={setactiveCart} />
    </>
  )
}
