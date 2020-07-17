import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory as createHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import sagas from './sagas'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const routeMiddleware = routerMiddleware(history)

const middlewares = [sagaMiddleware, routeMiddleware]

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  ...reducer,
  router: connectRouter(history),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
)

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export { store, history, persistor }
