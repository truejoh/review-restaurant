import actions from './actions'

const initialState = {
  loading: false,
  user: null,
  users: [],
  error: null,
}

export default function userReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actions.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
        error: null,
      }
    case actions.GET_ALL_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map(user => {
          if (user._id === payload.userId) {
            const newUser = Object.assign({}, user, payload.data)
            return newUser
          }
          return user
        }),
        error: null,
      }
    case actions.UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actions.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user._id !== payload),
        error: null,
      }
    case actions.DELETE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
