import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Annoncement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import StripeCheckout from 'react-stripe-checkout'
import publicRequest, { userRquest } from '../ApiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartSuccess, counterValid } from '../Redux/counterSlice'

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
  ${mobile({ fontSize: '14px' })}
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const Info = styled.div`
  flex: 3;
  margin-right: 10px;
`

const Summary = styled.div`
  flex: 2;
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

const ButtonO = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [validated, setValidated] = useState(false)
  const [payment, setPayment] = useState(' ')
  const [requiredField, setRequiredField] = useState()
  const [alert, setAlert] = useState()
  const STRIP_KEY = process.env.REACT_APP_STRIPE_KEY
  const [stripToken, setStripToken] = useState(null)
  const [amount, setAmount] = useState()
  const [order, setOrder] = useState([])
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    setRequiredField(form.checkValidity())
    setAddress({
      street: street,
      city: city,
      state: state,
      zip: zip,
    })
  }

  const updateOrder = async () => {
    await userRquest.put(`/order/${user._doc._id}`, {
      orderId: order._id,
      address,
      payment,
    })
  }
  const deleteCart = async () => {
    await userRquest.delete(`/cart/${user._doc._id}`)
  }

  const handleClick = async () => {
    if (payment !== ' ' && requiredField) {
      setAlert(false)
      dispatch(counterValid(0))
      await updateOrder()
      await deleteCart()
      dispatch(cartSuccess())
      navigate('/success')
    } else {
      setAlert(true)
    }
  }

  const onToken = (token) => {
    setStripToken(token)
  }

  useEffect(() => {
    const stripRequest = async () => {
      try {
        dispatch(counterValid(0))
        await publicRequest.post('/payment', {
          tokenId: stripToken.id,
          amount: amount,
        })
        await updateOrder()
        await deleteCart()
        dispatch(cartSuccess())
        navigate('/success')
      } catch (err) {
        console.log(err)
      }
    }
    if (stripToken) {
      stripRequest()
    }
  }, [stripToken, amount])

  useEffect(() => {
    const fetchOrder = async () => {
      const orderFetch = await userRquest.get(`/order/${user._doc._id}`)
      const orderData = orderFetch.data
      setOrder(orderData)
      const orderAmount = orderData.amount
      setAmount(orderAmount)
    }
    fetchOrder()
  }, [user])
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Checkout</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Shipping Address</Accordion.Header>
                <Accordion.Body>
                  <Form
                    noValidate
                    validated={validated}
                    onChange={handleChange}
                  >
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Street Name /Building no: "
                          required
                          onChange={(e) => setStreet(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid street name
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          required
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom03"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="State"
                          required
                          onChange={(e) => setState(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid state.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before checkout."
                        feedbackType="invalid"
                      />
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header style={{ color: 'red' }}>
                  Payment Option
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Cash On Delivery (COD)"
                      checked={payment === 'cash'}
                      onChange={() => setPayment('cash')}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Pay with Visa/MasterCard"
                      checked={payment === 'visa'}
                      onChange={() => setPayment('visa')}
                      disabled
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Order ID:</SummaryItemText>
              <SummaryItemPrice>{order._id}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Order Status:</SummaryItemText>
              <SummaryItemPrice>{order.status}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>EGP {order.amount}</SummaryItemPrice>
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
              <SummaryItemPrice>EGP {order.amount}</SummaryItemPrice>
            </SummaryItem>
            {payment === 'visa' && requiredField ? (
              <StripeCheckout
                name="Flex Developments"
                description={`your total is EGP ${amount}`}
                stripeKey={STRIP_KEY}
                amount={amount * 100}
                currency="USD"
                token={onToken}
              >
                <ButtonO>Place with Stripe</ButtonO>
              </StripeCheckout>
            ) : (
              <ButtonO onClick={handleClick}>Place Cash</ButtonO>
            )}
            {alert && (
              <Alert key="danger" variant="danger">
                please fill required fields!
              </Alert>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
