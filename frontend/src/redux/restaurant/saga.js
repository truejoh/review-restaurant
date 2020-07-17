import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import actions from './actions'
import { getHeaders, getEndpoint } from 'utils/api'

function* getAllRestaurantsRequestHandler() {
  const params = {
    url: getEndpoint('restaurants'),
    method: 'GET',
    headers: getHeaders(),
  }

  try {
    const { data } = yield call(axios.request, params)
    yield put(actions.getAllRestaurantsSuccess(data.restaurants))
  } catch (err) {
    yield put(actions.getAllRestaurantsFailed(err))
  }
}

function* createRestaurantRequestHandler({ payload }) {
  const params = {
    url: getEndpoint('restaurants'),
    method: 'POST',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const { data } = yield call(axios.request, params)

    yield put(actions.createRestaurantSuccess(data.restaurant))
  } catch (err) {
    yield put(actions.createRestaurantFailed(err))
  }
}

function* deleteRestaurantRequestHandler({ payload }) {
  const { restaurantId } = payload
  const params = {
    url: getEndpoint(`restaurants/${restaurantId}`),
    method: 'delete',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(actions.deleteRestaurantSuccess(restaurantId))
  } catch (err) {
    yield put(actions.deleteRestaurantFailed(err))
  }
}

function* editRestaurantRequestHandler({ payload }) {
  const { restaurantId, data } = payload
  const params = {
    url: getEndpoint(`restaurants/${restaurantId}`),
    method: 'PUT',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.editRestaurantSuccess({ restaurantId, data }))
  } catch (err) {
    yield put(actions.editRestaurantFailed(err))
  }
}

function* createFeedbackRequestHandler({ payload }) {
  const { restaurantId, data } = payload
  const params = {
    url: getEndpoint('reviews'),
    method: 'POST',
    headers: getHeaders(),
    data,
  }

  try {
    const { data: response } = yield call(axios.request, params)
    yield put(
      actions.createFeedbackSuccess({ restaurantId, data: response.review }),
    )
  } catch (err) {
    yield put(actions.createFeedbackFailed(err))
  }
}

function* deleteFeedbackRequestHandler({ payload }) {
  const { restaurantId, reviewId } = payload
  const params = {
    url: getEndpoint(`reviews/${reviewId}`),
    method: 'DELETE',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(actions.deleteFeedbackSuccess({ restaurantId, reviewId }))
  } catch (err) {
    yield put(actions.deleteFeedbackFailed(err))
  }
}

function* updateFeedbackRequestHandler({ payload }) {
  const { restaurantId, reviewId, data } = payload

  const params = {
    url: getEndpoint(`reviews/${reviewId}`),
    method: 'PUT',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.updateFeedbackSuccess({ restaurantId, reviewId, data }))
  } catch (err) {
    yield put(actions.updateFeedbackFailed(err))
  }
}

function* createReplyRequestHandler({ payload }) {
  const { restaurantId, reviewId, data } = payload
  const params = {
    url: getEndpoint(`reviews/${reviewId}/reply`),
    method: 'POST',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.createReplySuccess({ restaurantId, reviewId, data }))
  } catch (err) {
    yield put(actions.createReplyFailed(err))
  }
}

function* deleteReplyRequestHandler({ payload }) {
  const { restaurantId, reviewId, data } = payload
  const params = {
    url: getEndpoint(`reviews/${reviewId}/reply`),
    method: 'delete',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.deleteReplySuccess({ restaurantId, reviewId }))
  } catch (err) {
    yield put(actions.deleteReplyFailed(err))
  }
}

function* updateReplyRequestHandler({ payload }) {
  const { restaurantId, reviewId, data } = payload
  const params = {
    url: getEndpoint(`reviews/${reviewId}/reply`),
    method: 'PUT',
    headers: getHeaders(),
    data,
  }

  try {
    yield call(axios.request, params)
    yield put(actions.updateReplySuccess({ restaurantId, reviewId, data }))
  } catch (err) {
    yield put(actions.updateReplyFailed(err))
  }
}

export default function* restaurantSagas() {
  yield takeLatest(
    actions.GET_ALL_RESTAURANTS_REQUEST,
    getAllRestaurantsRequestHandler,
  )
  yield takeLatest(
    actions.CREATE_RESTAURANT_REQUEST,
    createRestaurantRequestHandler,
  )
  yield takeLatest(
    actions.DELETE_RESTAURANT_REQUEST,
    deleteRestaurantRequestHandler,
  )
  yield takeLatest(
    actions.EDIT_RESTAURANT_REQUEST,
    editRestaurantRequestHandler,
  )
  yield takeLatest(
    actions.CREATE_FEEDBACK_REQUEST,
    createFeedbackRequestHandler,
  )
  yield takeLatest(
    actions.DELETE_FEEDBACK_REQUEST,
    deleteFeedbackRequestHandler,
  )
  yield takeLatest(
    actions.UPDATE_FEEDBACK_REQUEST,
    updateFeedbackRequestHandler,
  )
  yield takeLatest(actions.CREATE_REPLY_REQUEST, createReplyRequestHandler)
  yield takeLatest(actions.DELETE_REPLY_REQUEST, deleteReplyRequestHandler)
  yield takeLatest(actions.UPDATE_REPLY_REQUEST, updateReplyRequestHandler)
}
