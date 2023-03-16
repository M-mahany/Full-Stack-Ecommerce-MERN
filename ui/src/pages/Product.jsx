import React from 'react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import styled from 'styled-components'
import Announcement from '../components/Annoncement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import publicRequest, { userRquest } from '../ApiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { cartSuccess, counterInc } from '../Redux/counterSlice'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

const Container = styled.div``

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`
const ImgContainer = styled.div`
  flex: 1;
`

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '0 10px' })}
`

const Title = styled.h1`
  font-weight: 300;
`

const Desc = styled.p`
  margin-top: 20px;
`

const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
`

// const FilterContainer = styled.div`
// display:flex;
// justify-content:space-between;
// width:50%;
// margin:30px 0px;
// ${mobile({width:"100%"})}
// `;

// const Filter = styled.div`
// display:flex;
// justify-content:center;
// align-items:center;
// `;

// const FilterTitle = styled.span`
// font-size:20px;
// font-weight:200;
// `;

// const FilterColor = styled.div`
// width:20px;
// height:20px;
// border-radius:50%;
// background-color: ${props=>props.color};
// margin:0px 5px;
// cursor:pointer;
// `;

// const FilterSize = styled.select`
// margin-left:10px;
// padding:5px;
// `;

// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  font-size: 16px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`

const Button = styled.button`
  padding: 10px;
  margin-left: 10px;
  border: 2.5px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`

const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const [products, setProducts] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const isFetching = useSelector((state) => state.counter.isFetching)
  const [showError, setShowError] = useState(false)
  const [fetching, setFetching] = useState(true)
  window.scrollTo(0, 0)

  useEffect(() => {
    const fetshSignleProduct = async () => {
      try {
        const response = await publicRequest.get('/product/' + id)
        const data = await response.data
        setProducts(data)
        setFetching(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetshSignleProduct()
  }, [id])

  const handleClickDec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleClickInc = () => {
    if (quantity < products.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = async () => {
    if (user) {
      dispatch(counterInc(quantity))
      await userRquest.post(`/cart/${user._doc._id}`, {
        productId: products._id,
        quantity,
        img: products.img,
        title: products.title,
        price: products.price,
      })
      dispatch(cartSuccess())
    } else {
      setShowError(true)
    }
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh looks like you are not signned in!</Alert.Heading>
          <p>
            Please Register if you don't have account or login to your account
            if you have one!
          </p>
        </Alert>
      )}
      {fetching ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100&',
            height: '100vh',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={products.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{products.title}</Title>
            <Desc>{products.desc}</Desc>
            <Price>EGP {products.price * quantity}</Price>
            {/* <FilterContainer> 
            <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer> */}
            <AddContainer>
              <AmountContainer>
                <IoMdRemove
                  style={{ fontSize: '22px' }}
                  onClick={handleClickDec}
                />
                <Amount>{quantity}</Amount>
                <IoMdAdd
                  style={{ fontSize: '22px' }}
                  onClick={handleClickInc}
                />
              </AmountContainer>
              <Button disabled={isFetching} onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
