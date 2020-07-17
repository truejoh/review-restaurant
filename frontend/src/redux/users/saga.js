import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import actions from './actions'
import { getHeaders, getEndpoint } from 'utils/api'

function* getAllUsersRequestHandler() {
  const params = {
    url: getEndpoint('users'),
    method: 'GET',
    headers: getHeaders(),
  }

  try {
    const { data } = yield call(axios.request, params)

    yield put(actions.getAllUsersSuccess(data.users))
  } catch (err) {
    yield put(actions.getAllUsersFailed(err))
  }
}

function* updateUserRequestHandler({ payload }) {
  const { userId, data } = payload
  const params = {
    url: getEndpoint(`users/${userId}`),
    method: 'PUT',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.updateUserSuccess({ userId, data }))
  } catch (err) {
    yield put(actions.updateUserFailed(err))
  }
}

function* deleteUserRequestHandler({ payload }) {
  const { userId } = payload
  const params = {
    url: getEndpoint(`users/${userId}`),
    method: 'DELETE',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(actions.deleteUserSuccess(userId))
  } catch (err) {
    yield put(actions.deleteUserFailed(err))
  }
}

export default function* userSagas() {
  yield takeLatest(actions.GET_ALL_USERS_REQUEST, getAllUsersRequestHandler)
  yield takeLatest(actions.UPDATE_USER_REQUEST, updateUserRequestHandler)
  yield takeLatest(actions.DELETE_USER_REQUEST, deleteUserRequestHandler)
}
