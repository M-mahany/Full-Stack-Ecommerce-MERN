import publicRequest from './ApiRequest'
import { loginFailure, loginStart, loginSuccess } from './userRedux'

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post('/auth/login', user)
    if (response.data._doc.isAdmin) {
      dispatch(loginSuccess(response.data))
      const token = response.data.token
      localStorage.setItem('Authorization', token)
    } else {
      dispatch(loginFailure())
    }
  } catch (err) {
    dispatch(loginFailure())
  }
}
