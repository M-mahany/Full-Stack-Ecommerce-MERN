import { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import publicRequest from '../ApiRequest'

const Pay = () => {
  const STRIP_KEY =
    'pk_test_51Mgam9EvM5dWGQhURCP7ZxRRqgcOgRjRzl0PMMaiTaF6ytZQkto8xq4n7K1ZaFZC57ZFoHCo6QOrwRwrM2B8s8Y0000p1VRcnE'
  const [stripToken, setStripToken] = useState(null)
  const amount = 20000
  const onToken = (token) => {
    setStripToken(token)
  }

  useEffect(() => {
    const stripRequest = async () => {
      try {
        await publicRequest.post('/payment', {
          tokenId: stripToken.id,
          amount: amount,
        })
      } catch (err) {
        console.log(err)
      }
    }
    if (stripToken) {
      stripRequest()
    }
  }, [stripToken])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <StripeCheckout
        name="Flex Developments"
        description="your total is $20"
        stripeKey={STRIP_KEY}
        amount={amount}
        currency="USD"
        token={onToken}
      >
        <button
          style={{
            backgroundColor: 'black',
            width: '100px',
            height: '50px',
            color: 'white',
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  )
}

export default Pay
