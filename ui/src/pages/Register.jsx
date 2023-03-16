import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { publicRequest } from '../ApiRequest'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://img.freepik.com/free-photo/black-woman-trendy-grey-leather-jacket-posing-beige-background-studio-winter-autumn-fashion-look_273443-141.jpg?w=1200')
      center;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: '85%' })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, SetPaswword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [disabled, setdisabled] = useState(true)

  useEffect(() => {
    const validation = () => {
      if (
        firstName.length > 0 &&
        lastName.length > 0 &&
        username.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0
      ) {
        setdisabled(false)
      }
    }
    validation()
  }, [firstName, lastName, username, email, password, confirmPassword])

  const handleClick = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      try {
        const res = await publicRequest.post('/auth/register', {
          firstName,
          lastName,
          username,
          password,
          email,
        })
        console.log(res)
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    } else {
      setError(true)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => SetPaswword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of personal data
            in accordance with the <b>Privacy Policy</b>
          </Agreement>
          <Button onClick={handleClick} disabled={disabled}>
            CREATE
          </Button>
          {error && (
            <Alert key="danger" variant="danger">
              Error! Password mismatch
            </Alert>
          )}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
