import React from 'react'
import { Route } from 'react-router-dom'
import Home from './home/Home'

export default function Routes() {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
    </>
  )
}
