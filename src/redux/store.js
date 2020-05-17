import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const linitialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  linitialState,
  compose(
    applyMiddleware(...middleware)
  )
)

export default store
