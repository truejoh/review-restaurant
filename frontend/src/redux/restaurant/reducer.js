import actions from './actions'
import { addReplyToState, deleteReplyToState } from 'utils/review'

const initialState = {
  loading: false,
  restaurant: null,
  restaurants: [],
  error: null,
}

export default function restaurantReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actions.CREATE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: [...state.restaurants, payload],
        error: null,
      }
    case actions.CREATE_RESTAURANT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.GET_ALL_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: payload,
      }
    case actions.GET_ALL_RESTAURANTS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.DELETE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(item => item._id !== payload),
        error: null,
      }
    case actions.DELETE_RESTAURANT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.EDIT_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.EDIT_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map(item => {
          if (item._id === payload.restaurantId) {
            const newData = Object.assign({}, item, payload.data)
            return newData
          }
          return item
        }),
        error: null,
      }
    case actions.EDIT_RESTAURANT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map(item => {
          if (item._id === payload.restaurantId) {
            const { reviews } = item
            const newReviews = [...reviews, payload.data]
            const newData = Object.assign({}, item, { reviews: newReviews })
            return newData
          }
          return item
        }),
        error: null,
      }
    case actions.CREATE_FEEDBACK_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.DELETE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: payload,
      }
    case actions.DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map(item => {
          if (item._id === payload.restaurantId) {
            const { reviews } = item
            const newReviews = reviews.filter(
              review => review._id !== payload.reviewId,
            )
            const newData = Object.assign({}, item, { reviews: newReviews })
            return newData
          }
          return item
        }),
        error: null,
      }
    case actions.DELETE_FEEDBACK_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.UPDATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map(data => {
          if (data._id === payload.restaurantId) {
            const { reviews } = data
            const newReviews = reviews.map(review => {
              if (review._id === payload.reviewId) {
                const newData = Object.assign({}, review, payload.data)
                return newData
              }
              return review
            })
            const newData = Object.assign({}, data, { reviews: newReviews })
            return newData
          }
          return data
        }),
        error: null,
      }
    case actions.UPDATE_FEEDBACK_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.CREATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.CREATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: addReplyToState(
          state.restaurants,
          payload.restaurantId,
          payload.reviewId,
          payload.data.reply,
        ),
        error: null,
      }
    case actions.CREATE_REPLY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.DELETE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.DELETE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: deleteReplyToState(
          state.restaurants,
          payload.restaurantId,
          payload.reviewId,
        ),
        error: null,
      }
    case actions.DELETE_REPLY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.UPDATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.UPDATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: addReplyToState(
          state.restaurants,
          payload.restaurantId,
          payload.reviewId,
          payload.data.reply,
        ),
        error: null,
      }
    case actions.UPDATE_REPLY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
