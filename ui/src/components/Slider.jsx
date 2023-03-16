import React, { useEffect, useState } from 'react'
import './Slider.css'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import { sliderItems } from './data'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }

  useEffect(() => {
    setInterval(() => {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }, 10000)
  }, [])

  return (
    <div className="ContainerS">
      <div
        direction="left"
        className="Arrow"
        style={{ left: '10px' }}
        onClick={() => handleClick('left')}
      >
        <FaCaretLeft />
      </div>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <div
            className="SlideS"
            style={{ backgroundColor: item.bg }}
            key={item.id}
          >
            <div className="ImgContainerS">
              <img className="Img" src={item.img} alt="img" />
            </div>
            <div className="InfoContainerS">
              <h1 className="Title">{item.title}</h1>
              <p className="Desc">{item.desc}</p>
              <button className="buttonS">Shop Now</button>
            </div>
          </div>
        ))}
      </Wrapper>
      <div
        direction="right"
        className="Arrow"
        style={{ right: '10px' }}
        onClick={() => handleClick('right')}
      >
        <FaCaretRight />
      </div>
    </div>
  )
}

export default Slider
