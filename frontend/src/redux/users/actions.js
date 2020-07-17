const userActions = {
  GET_ALL_USERS_REQUEST: 'GET_ALL_USERS_REQUEST',
  GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAILED: 'GET_ALL_USERS_FAILED',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED: 'DELETE_USER_FAILED',

  getAllUsersRequest: () => ({
    type: userActions.GET_ALL_USERS_REQUEST,
  }),
  getAllUsersSuccess: payload => ({
    type: userActions.GET_ALL_USERS_SUCCESS,
    payload,
  }),
  getAllUsersFailed: payload => ({
    type: userActions.GET_ALL_USERS_FAILED,
    payload,
  }),

  updateUserRequest: payload => ({
    type: userActions.UPDATE_USER_REQUEST,
    payload,
  }),
  updateUserSuccess: payload => ({
    type: userActions.UPDATE_USER_SUCCESS,
    payload,
  }),
  updateUserFailed: payload => ({
    type: userActions.UPDATE_USER_FAILED,
    payload,
  }),
  deleteUserRequest: payload => ({
    type: userActions.DELETE_USER_REQUEST,
    payload,
  }),
  deleteUserSuccess: payload => ({
    type: userActions.DELETE_USER_SUCCESS,
    payload,
  }),
  deleteUserFailed: payload => ({
    type: userActions.DELETE_USER_FAILED,
    payload,
  }),
}

export default userActions
