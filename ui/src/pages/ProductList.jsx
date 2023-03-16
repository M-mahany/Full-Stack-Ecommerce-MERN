import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Annoncement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'

const Container = styled.div``
const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option``

const ProductList = () => {
  const [sort, setSort] = useState()
  const [searchParams] = useSearchParams()
  const selectedQueryCat = searchParams.get('category')
  window.scrollTo(0, 0)

  const handleChange = (e) => {
    setSort(e.target.value)
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{selectedQueryCat}</Title>
      <FilterContainer>
        {/* <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter> */}
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleChange}>
            <Option>Newest</Option>
            <Option value="asc">Price (Lowest)</Option>
            <Option value="desc">Price (Highest)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
