import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"

import reducer from "../reducers"
import rootSaga from "../sagas"

const configuerStore = () => {
  const sagaMiddleWare = createSagaMiddleware()
  const loggerMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log(action)
      return next(action)
    }
  const middleWares = [sagaMiddleWare, loggerMiddleware]
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleWares))
      : composeWithDevTools(applyMiddleware(...middleWares))
  const store = createStore(reducer, enhancer)
  store.sagaTask = sagaMiddleWare.run(rootSaga)
  return store
}

const wrapper = createWrapper(configuerStore, {
  debug: process.env.NODE_ENV === "development",
})

export default wrapper
