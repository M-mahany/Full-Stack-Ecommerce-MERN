import styled from 'styled-components'
import Product from './Product'
import { useEffect, useState } from 'react'
import { publicRequest } from '../ApiRequest'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = ({ search, sort }) => {
  const [products, setProducts] = useState([])
  const query = useLocation()
  const fullQueryName = query.search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get(`/products${fullQueryName}`)
        const data = response.data
        setProducts(data)
        if (sort) {
          if (sort === 'asc') {
            data.sort((a, b) => a.price - b.price)
          } else {
            data.sort((a, b) => b.price - a.price)
          }
        } else {
          if (search) {
            const filterProducts = data.filter((item) =>
              item.title.toLowerCase().includes(search)
            )
            setProducts(filterProducts)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [search, sort, fullQueryName])

  return (
    <Container>
      {search && products.length === 0 ? (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          no items matches your search "{search}"
        </p>
      ) : (
        products.map((item) => <Product item={item} key={item._id} />)
      )}
    </Container>
  )
}

export default Products
