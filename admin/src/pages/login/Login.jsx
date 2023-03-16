import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './login.scss'
import { login } from '../../Redux/apiCalls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isFetching}>
          LOGIN
        </button>
        {error && (
          <span>Wrong email/password or your account is not admin!</span>
        )}
      </form>
    </div>
  )
}

export default Login
