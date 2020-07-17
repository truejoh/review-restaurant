import actions from './actions'

const initialState = {
  loading: false,
  user: null,
  error: null,
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actions.SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      }
    case actions.SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      }
    case actions.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.SIGNOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.SIGNOUT_SUCCESS:
      return {
        user: null,
        loading: false,
        error: null,
      }
    case actions.SIGNOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
