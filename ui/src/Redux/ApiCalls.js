import publicRequest from '../ApiRequest'
import { loginFailure, loginStart, loginSuccess } from './userSlice'

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post('/auth/login', user)
    dispatch(loginSuccess(response.data))
    const token = response.data.token
    localStorage.setItem('Authorization', token)
  } catch (err) {
    dispatch(loginFailure())
  }
}
