import { createStore } from "redux";
import combinedReducers from "./combine";

const store = createStore(combinedReducers);

export default store