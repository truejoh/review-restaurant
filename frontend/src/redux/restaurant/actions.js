const restaurantActions = {
  CREATE_RESTAURANT_REQUEST: 'CREATE_RESTAURANT_REQUEST',
  CREATE_RESTAURANT_SUCCESS: 'CREATE_RESTAURANT_SUCCESS',
  CREATE_RESTAURANT_FAILED: 'CREATE_RESTAURANT_FAILED',

  GET_ALL_RESTAURANTS_REQUEST: 'GET_ALL_RESTAURANTS_REQUEST',
  GET_ALL_RESTAURANTS_SUCCESS: 'GET_ALL_RESTAURANTS_SUCCESS',
  GET_ALL_RESTAURANTS_FAILED: 'GET_ALL_RESTAURANTS_FAILED',

  DELETE_RESTAURANT_REQUEST: 'DELETE_RESTAURANT_REQUEST',
  DELETE_RESTAURANT_SUCCESS: 'DELETE_RESTAURANT_SUCCESS',
  DELETE_RESTAURANT_FAILED: 'DELETE_RESTAURANT_FAILED',

  EDIT_RESTAURANT_REQUEST: 'EDIT_RESTAURANT_REQUEST',
  EDIT_RESTAURANT_SUCCESS: 'EDIT_RESTAURANT_SUCCESS',
  EDIT_RESTAURANT_FAILED: 'EDIT_RESTAURANT_FAILED',

  CREATE_FEEDBACK_REQUEST: 'CREATE_FEEDBACK_REQUEST',
  CREATE_FEEDBACK_SUCCESS: 'CREATE_FEEDBACK_SUCCESS',
  CREATE_FEEDBACK_FAILED: 'CREATE_FEEDBACK_FAILED',

  DELETE_FEEDBACK_REQUEST: 'DELETE_FEEDBACK_REQUEST',
  DELETE_FEEDBACK_SUCCESS: 'DELETE_FEEDBACK_SUCCESS',
  DELETE_FEEDBACK_FAILED: 'DELETE_FEEDBACK_FAILED',

  UPDATE_FEEDBACK_REQUEST: 'UPDATE_FEEDBACK_REQUEST',
  UPDATE_FEEDBACK_SUCCESS: 'UPDATE_FEEDBACK_SUCCESS',
  UPDATE_FEEDBACK_FAILED: 'UPDATE_FEEDBACK_FAILED',

  CREATE_REPLY_REQUEST: 'CREATE_REPLY_REQUEST',
  CREATE_REPLY_SUCCESS: 'CREATE_REPLY_SUCCESS',
  CREATE_REPLY_FAILED: 'CREATE_REPLY_FAILED',

  DELETE_REPLY_REQUEST: 'DELETE_REPLY_REQUEST',
  DELETE_REPLY_SUCCESS: 'DELETE_REPLY_SUCCESS',
  DELETE_REPLY_FAILED: 'DELETE_REPLY_FAILED',

  UPDATE_REPLY_REQUEST: 'UPDATE_REPLY_REQUEST',
  UPDATE_REPLY_SUCCESS: 'UPDATE_REPLY_SUCCESS',
  UPDATE_REPLY_FAILED: 'UPDATE_REPLY_FAILED',

  createRestaurantRequest: payload => ({
    type: restaurantActions.CREATE_RESTAURANT_REQUEST,
    payload,
  }),
  createRestaurantSuccess: payload => ({
    type: restaurantActions.CREATE_RESTAURANT_SUCCESS,
    payload,
  }),
  createRestaurantFailed: payload => ({
    type: restaurantActions.CREATE_RESTAURANT_FAILED,
    payload,
  }),

  getAllRestaurantsRequest: () => ({
    type: restaurantActions.GET_ALL_RESTAURANTS_REQUEST,
  }),
  getAllRestaurantsSuccess: payload => ({
    type: restaurantActions.GET_ALL_RESTAURANTS_SUCCESS,
    payload,
  }),
  getAllRestaurantsFailed: payload => ({
    type: restaurantActions.GET_ALL_RESTAURANTS_FAILED,
    payload,
  }),

  deleteRestaurantRequest: payload => ({
    type: restaurantActions.DELETE_RESTAURANT_REQUEST,
    payload,
  }),
  deleteRestaurantSuccess: payload => ({
    type: restaurantActions.DELETE_RESTAURANT_SUCCESS,
    payload,
  }),
  deleteRestaurantFailed: payload => ({
    type: restaurantActions.DELETE_RESTAURANT_FAILED,
    payload,
  }),

  editRestaurantRequest: payload => ({
    type: restaurantActions.EDIT_RESTAURANT_REQUEST,
    payload,
  }),
  editRestaurantSuccess: payload => ({
    type: restaurantActions.EDIT_RESTAURANT_SUCCESS,
    payload,
  }),
  editRestaurantFailed: payload => ({
    type: restaurantActions.EDIT_RESTAURANT_FAILED,
    payload,
  }),

  createFeedbackRequest: payload => ({
    type: restaurantActions.CREATE_FEEDBACK_REQUEST,
    payload,
  }),
  createFeedbackSuccess: payload => ({
    type: restaurantActions.CREATE_FEEDBACK_SUCCESS,
    payload,
  }),
  createFeedbackFailed: payload => ({
    type: restaurantActions.CREATE_FEEDBACK_FAILED,
    payload,
  }),

  deleteFeedbackRequest: payload => ({
    type: restaurantActions.DELETE_FEEDBACK_REQUEST,
    payload,
  }),
  deleteFeedbackSuccess: payload => ({
    type: restaurantActions.DELETE_FEEDBACK_SUCCESS,
    payload,
  }),
  deleteFeedbackFailed: payload => ({
    type: restaurantActions.DELETE_FEEDBACK_FAILED,
    payload,
  }),

  updateFeedbackRequest: payload => ({
    type: restaurantActions.UPDATE_FEEDBACK_REQUEST,
    payload,
  }),
  updateFeedbackSuccess: payload => ({
    type: restaurantActions.UPDATE_FEEDBACK_SUCCESS,
    payload,
  }),
  updateFeedbackFailed: payload => ({
    type: restaurantActions.UPDATE_FEEDBACK_FAILED,
    payload,
  }),
  createReplyRequest: payload => ({
    type: restaurantActions.CREATE_REPLY_REQUEST,
    payload,
  }),
  createReplySuccess: payload => ({
    type: restaurantActions.CREATE_REPLY_SUCCESS,
    payload,
  }),
  createReplyFailed: payload => ({
    type: restaurantActions.CREATE_REPLY_FAILED,
    payload,
  }),
  deleteReplyRequest: payload => ({
    type: restaurantActions.DELETE_REPLY_REQUEST,
    payload,
  }),
  deleteReplySuccess: payload => ({
    type: restaurantActions.DELETE_REPLY_SUCCESS,
    payload,
  }),
  deleteReplyFailed: payload => ({
    type: restaurantActions.DELETE_REPLY_FAILED,
    payload,
  }),
  updateReplyRequest: payload => ({
    type: restaurantActions.UPDATE_REPLY_REQUEST,
    payload,
  }),
  updateReplySuccess: payload => ({
    type: restaurantActions.UPDATE_REPLY_SUCCESS,
    payload,
  }),
  updateReplyFailed: payload => ({
    type: restaurantActions.UPDATE_REPLY_FAILED,
    payload,
  }),
}

export default restaurantActions
