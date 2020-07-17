import { all } from 'redux-saga/effects'

import authSagas from './auth/saga'
import restaurantSagas from './restaurant/saga'
import usersSagas from './users/saga'

export default function* rootSaga() {
  yield all([authSagas(), restaurantSagas(), usersSagas()])
}
