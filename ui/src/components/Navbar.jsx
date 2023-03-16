import React, { useEffect, useState } from 'react'
import { BiSearchAlt, BiCartAlt } from 'react-icons/bi'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRquest } from '../ApiRequest'
import { cartSuccess, counterValid } from '../Redux/counterSlice'
import Dropdown from 'react-bootstrap/Dropdown'
import { AiOutlineUser } from 'react-icons/ai'
import Products from './Products'
import { persistor } from '../Redux/store'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '60px' })}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`
const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`
const Center = styled.div`
  text-align: center;
  flex: 1;
  ${mobile({ marginLeft: '5px' })}
`
const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', flex: '2' })}
`
const Language = styled.span`
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  margin-left: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  ${mobile({ marginLeft: '12px' })}
`
const Input = styled.input`
  border: none;
  ${mobile({ width: '55px' })}
`
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`
const MenuItem = styled.div`
  margin-left: 25px;
  font-size: 14px;
  cursor: pointer;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
  const counter = useSelector((state) => state.counter.value)
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  const [fetch, setFetch] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleChange = (inputValue) => {
    setSearch(inputValue.toLowerCase())
  }
  const handleLogout = () => {
    dispatch(counterValid())
    dispatch(cartSuccess())
    persistor.pause()
    persistor.flush().then(() => {
      return persistor.purge()
    })
    navigate('/')
    window.location.reload()
  }
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await userRquest.get(`/cart/${user._doc._id}`)
        const productsData = await response.data.products
        const Qarry = productsData.map((x) => x.quantity)
        let initial = 0
        const QaarySum = Qarry.reduce(
          (prev, current) => prev + current,
          initial
        )
        dispatch(counterValid(QaarySum))
        dispatch(cartSuccess())
        setFetch(true)
      } catch (err) {
        setFetch(false)
      }
    }
    // if user exists and having products in cart run fetching
    if (user && fetch) {
      fetchCart()
    }
  }, [user, dispatch, fetch])
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => handleChange(e.target.value)}
              />
              <BiSearchAlt className="cartIcon" />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <Logo>FlexDev.</Logo>
            </Link>
          </Center>

          <Right>
            {!user && (
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  REGISTER
                </Link>
              </MenuItem>
            )}
            {!user && (
              <MenuItem className="menuItem">
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  SIGN IN
                </Link>
              </MenuItem>
            )}
            {user && (
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  <span style={{ fontSize: '12px', color: 'white' }}>
                    Welcome Back {user._doc.firstName} !{' '}
                  </span>
                  <AiOutlineUser />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Orders</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <MenuItem>
              <button type="button" className="btn position-relative">
                <Link
                  to="/cart"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <BiCartAlt style={{ fontSize: '26px' }} />
                  {counter > 0 && (
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary">
                      {counter}
                    </span>
                  )}
                </Link>
              </button>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
      {search && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: '5',
          }}
        >
          <Products search={search} onClick={() => window.location.reload()} />
        </div>
      )}
    </>
  )
}

export default Navbar
