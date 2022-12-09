import React from 'react'
import { Route } from 'react-router-dom'
import Home from './home/Home'
import Pdp from './pdp/Pdp'
import SeeAll from './seeall/SeeAll'

export default function Routes() {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/category/products/:categoryId">
        <SeeAll />
      </Route>
      <Route exact path="/pdp/:productId">
        <Pdp />
      </Route>
    </>
  )
}
