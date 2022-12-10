import { createStore } from "redux";
import CART from "./reducer";

const store = createStore(CART);

export default store