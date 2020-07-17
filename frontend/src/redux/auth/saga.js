import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

import actions from './actions'
import {
  saveToken,
  clearToken,
  saveUser,
  clearUser,
} from 'utils/localStorage'
import { getHeaders, getEndpoint } from 'utils/api'

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* signinRequestHandler({ payload }) {
  const params = {
    url: getEndpoint('auth/login'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const { data } = yield call(axios.request, params)
    const { token, user } = data

    saveToken(token)
    saveUser(user)
    yield put(actions.signinSuccess(user))
    yield put(push('/home'))
  } catch (err) {
    yield put(actions.signinFailed(err))
    yield call(delay, 4000)
    yield put(actions.signinFailed(null))
  }
}

function* signupRequestHandler({ payload }) {
  const params = {
    url: getEndpoint('auth/register'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const { data } = yield call(axios.request, params)
    const { token, user } = data

    saveToken(token)
    saveUser(user)
    yield put(actions.signupSuccess(user))
    yield put(push('/home'))
  } catch (err) {
    yield put(actions.signupFailed(err))
    yield call(delay, 4000)
    yield put(actions.signinFailed(null))
  }
}

function* signoutRequestHandler() {
  const params = {
    url: getEndpoint('auth/logout'),
    method: 'GET',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    clearToken()
    clearUser()

    yield put(actions.signoutSuccess())
    yield put(push('/login'))
  } catch (err) {
    yield put(actions.signoutFailed(err))
  }
}

export default function* authSagas() {
  yield takeLatest(actions.SIGNIN_REQUEST, signinRequestHandler)
  yield takeLatest(actions.SIGNUP_REQUEST, signupRequestHandler)
  yield takeLatest(actions.SIGNOUT_REQUEST, signoutRequestHandler)
}
