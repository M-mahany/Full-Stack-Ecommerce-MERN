import React, { useEffect, useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { imagePost, userRquest } from '../../Redux/ApiRequest'
import { useSelector } from 'react-redux'

const New = ({ inputs, title }) => {
  const user = useSelector((state) => state.user.currentUser)
  const [file, setFile] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [data, setData] = useState({})
  const [soldBy, setSoldBy] = useState('')
  const [fetching, setFetching] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    const id = e.target.id
    const value = e.target.value
    setData({ ...data, [id]: value })
  }

  useEffect(() => {
    const uploadToS3 = async () => {
      try {
        setFetching(true)
        const form = new FormData()
        form.append('image', file)
        const res = await imagePost.post('/imageUploadAWS', form)
        const awsUrl = res.data.location
        setImgUrl(awsUrl)
        setFetching(false)
      } catch (err) {
        console.log(err)
      }
    }
    file && uploadToS3()
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setFetching(true)
      await userRquest.post(`/product/${user._doc._id}`, {
        sku: data.sku,
        title: data.title,
        desc: data.desc,
        img: imgUrl,
        quantity: Number(data.quantity),
        price: Number(data.price),
        category: data.category,
        soldBy: soldBy,
      })
      setFetching(false)
    } catch (err) {}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? imgUrl
                  : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.text}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <label htmlFor="SoldBy">Sold By</label>
              <select name="SoldBy" onChange={(e) => setSoldBy(e.target.value)}>
                <option disabled></option>
                <option>Mobile Store</option>
              </select>
              <button onClick={handleSubmit} disabled={fetching}>
                {' '}
                Send{' '}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
