import React from 'react'
import { Route } from 'react-router-dom'
import Comparison from './comparison/Comparison'
import Home from './home/Home'
import Pdp from './pdp/Pdp'
import SeeAll from './seeall/SeeAll'

export default function Routes({ setactiveCart }) {
  return (
    <>
      <Route exact path="/">
        <Home setactiveCart={setactiveCart} />
      </Route>
      <Route exact path="/category/products/:categoryId">
        <SeeAll />
      </Route>
      <Route exact path="/pdp/:productId">
        <Pdp />
      </Route>
      <Route exact path="/category/products/pdp/:productId">
        <Pdp />
      </Route>
      <Route exact path="/comparison">
        <Comparison />
      </Route>
    </>
  )
}
