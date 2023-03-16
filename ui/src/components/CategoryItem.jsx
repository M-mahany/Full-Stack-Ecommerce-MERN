import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Conatiner = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: '30vh' })}
`
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  text-align: center;
  color: black;
  margin-bottom: 16px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
`

const CategoryItem = ({ item }) => {
  return (
    <Conatiner>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>
          <Link
            style={{ textDecoration: 'none', color: 'gray' }}
            to={`Products?category=${item.cat}`}
          >
            SHOP NOW
          </Link>
        </Button>
      </Info>
    </Conatiner>
  )
}

export default CategoryItem
