import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Table from 'react-bootstrap/Table'
import './orders.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { userRquest } from '../../Redux/ApiRequest'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector((state) => state.user.currentUser)
  useEffect(() => {
    const fetchingOrders = async () => {
      const orders = await userRquest.get(`/allOrders/${user._doc._id}`)
      setOrders(orders.data)
    }
    fetchingOrders()
  }, [user])
  return (
    <div className="order">
      <Sidebar />
      <div className="conatiner">
        <Navbar />
        <div className="top">
          <h1>Orders</h1>
        </div>
        <div className="bottom">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Order Status</th>
                <th style={{ display: 'flex', justifyContent: 'center' }}>
                  <MoreHorizIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.userId}</td>
                  <td>
                    <span>{order.address[0].street}, </span>
                    <span>{order.address[0].city}, </span>
                    <span>{order.address[0].state}</span>
                  </td>
                  <td>{order.amount}</td>
                  <td>
                    <p className={`status ${order.status}`}>{order.status}</p>
                  </td>
                  <td>
                    <button>change status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Orders
