import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Annoncement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { GrAdd } from 'react-icons/gr'
import { IoMdRemove } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { mobile } from '../responsive'
import { userRquest } from '../ApiRequest'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartSuccess,
  counterAdd,
  counterDelete,
  counterRemove,
  counterDefault,
} from '../Redux/counterSlice'
import Spinner from 'react-bootstrap/Spinner'
import { Link, useNavigate } from 'react-router-dom'

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: '10px' })}
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'Black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'White'};
  cursor: pointer;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
  ${mobile({ fontSize: '14px' })}
`

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`

// const TopText = styled.span`
//   font-size: 16px;
//   text-decoration: underline;
//   cursor: pointer;
//   margin: 0px 10px;
// `

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const Info = styled.div`
  flex: 3;
  position: relative;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

// const ProductColor = styled.div`
// width:20px;
// height:20px;
// border-radius:50%;
// background-color: ${props=>props.color};
// `;

// const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 10px;
  ${mobile({ margin: '5px 18px' })}
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && 'bold'};
  font-size: ${(props) => props.type === 'total' && '20px'};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`
const ButtonQ = styled.button`
  border: 1px solid teal;
  border-radius: 50px;
  display: flex;
  justifycontent: center;
  alignitems: center;
  padding: 5px;
  background-color: white;
`

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const isFetching = useSelector((state) => state.counter.isFetching)
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const [effect, setEffect] = useState(0)
  const [cartTotal, setCartTotal] = useState()
  const [cartQuantity, setcartQuantity] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          dispatch(counterDefault())
          const response = await userRquest.get(`/cart/${user._doc._id}`)
          const productsData = await response.data.products
          setProducts(productsData)
          dispatch(cartSuccess())
        }
      } catch (err) {
        console.log(err)
        dispatch(cartSuccess())
      }
    }
    fetchCart()
  }, [effect, user, dispatch])

  useEffect(() => {
    const CalculateCartDetails = () => {
      const Qarry = products.map((x) => x.price * x.quantity)
      let initial = 0
      const QaarySum = Qarry.reduce((prev, current) => prev + current, initial)
      setCartTotal(QaarySum)
      const cart_single_Quantity = products.map((x) => x.quantity)
      const cart_Total_Quantity = cart_single_Quantity.reduce(
        (prev, current) => prev + current,
        initial
      )
      setcartQuantity(cart_Total_Quantity)
      console.log('useEffcet 2 rendered')
    }
    CalculateCartDetails()
  }, [products])

  const handleInc = async (productId) => {
    try {
      dispatch(counterAdd())
      await userRquest.put(`/cartInc/${user._doc._id}`, { productId })
      setEffect(effect + 1)
      setTimeout(() => {
        dispatch(cartSuccess())
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }
  const handleDec = async (productId, quantity) => {
    try {
      dispatch(counterRemove())
      await userRquest.put(`/cartDec/${user._doc._id}`, { productId, quantity })
      setEffect(effect + 1)
      setTimeout(() => {
        dispatch(cartSuccess())
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }
  const CartProductDelete = async (productId, quantity) => {
    try {
      dispatch(counterDelete(quantity))
      await userRquest.put(`/cart-product/${user._doc._id}`, {
        productId,
      })
      setEffect(effect + 1)
      setTimeout(() => {
        dispatch(cartSuccess())
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }
  const CheckoutCart = async () => {
    await userRquest.post(`/order/${user._doc._id}`, {
      products,
      amount: cartTotal,
    })
    navigate('/checkout')
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              CONTINUE SHOPPING
            </Link>
          </TopButton>
          <TopTexts>
            {/* <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton
            type="filled"
            disabled={isFetching || cartQuantity === 0}
            onClick={() => CheckoutCart()}
          >
            Proceed to buy ({cartQuantity} items)
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {isFetching && (
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255,255, 0.8)',
                }}
              >
                <Spinner
                  animation="border"
                  style={{ height: '50px', width: '50px' }}
                />
              </div>
            )}
            {products.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: {item._id}</b>
                    </ProductId>
                    {/* <ProductColor color="black" />
              <ProductSize>
                <b>Size:</b> 37.5
              </ProductSize> */}
                  </Details>
                </ProductDetail>

                <PriceDetail>
                  <ProductAmountContainer>
                    <ButtonQ onClick={() => handleInc(item._id)}>
                      <GrAdd />
                    </ButtonQ>
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <ButtonQ onClick={() => handleDec(item._id, item.quantity)}>
                      <IoMdRemove />
                    </ButtonQ>
                  </ProductAmountContainer>
                  <ProductPrice>EGP {item.price * item.quantity}</ProductPrice>
                  <div
                    style={{
                      marginTop: '5px',
                      width: '55%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <RiDeleteBin2Line
                      onClick={() => CartProductDelete(item._id, item.quantity)}
                      style={{
                        color: 'teal',
                        fontSize: '22px',
                        border: '1px solid teal',
                        padding: '4px',
                        borderRadius: '50px',
                        height: '32px',
                        width: '32px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </PriceDetail>
              </Product>
            ))}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice> EGP {cartTotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>EGP 29</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>EGP -29</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>EGP {cartTotal}</SummaryItemPrice>
            </SummaryItem>
            <Button
              onClick={() => CheckoutCart()}
              disabled={isFetching || cartQuantity === 0}
            >
              Proceed to buy ({cartQuantity} items)
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
