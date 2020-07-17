const authActions = {
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_FAILED: 'SIGNIN_FAILED',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILED: 'SIGNUP_FAILED',

  SIGNOUT_REQUEST: 'SIGNOUT_REQUEST',
  SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
  SIGNOUT_FAILED: 'SIGNOUT_FAILED',

  signinRequest: payload => ({ type: authActions.SIGNIN_REQUEST, payload }),
  signinSuccess: payload => ({ type: authActions.SIGNIN_SUCCESS, payload }),
  signinFailed: payload => ({ type: authActions.SIGNIN_FAILED, payload }),

  signupRequest: payload => ({ type: authActions.SIGNUP_REQUEST, payload }),
  signupSuccess: payload => ({ type: authActions.SIGNUP_SUCCESS, payload }),
  signupFailed: payload => ({ type: authActions.SIGNUP_FAILED, payload }),

  signoutRequest: () => ({ type: authActions.SIGNOUT_REQUEST }),
  signoutSuccess: () => ({ type: authActions.SIGNOUT_SUCCESS }),
  signoutFailed: payload => ({ type: authActions.SIGNOUT_FAILED, payload }),
}

export default authActions
