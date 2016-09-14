import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"

const middlewares = [thunk]

const createStoreWrapper = compose(
  applyMiddleware(...middlewares)
)(createStore)

const store = createStoreWrapper(reducers)

export default store
