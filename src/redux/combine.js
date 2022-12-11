import { combineReducers } from "redux";
import { CART, COMPARISON } from "./reducer";

const combinedReducers = combineReducers({
  cart: CART,
  comparison: COMPARISON
})

export default combinedReducers