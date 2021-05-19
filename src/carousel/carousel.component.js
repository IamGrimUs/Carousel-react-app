import React, { useState, createRef, useEffect } from 'react';
import { Slide } from '../_shared/components/slide/slide.component.js'
import { slideLimit, displayDuration } from '../_shared/config.js'
import { slidesData } from '../_shared/slidesData'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import './carousel.styles.css'

export const Carousel = () => {
  const [current, setCurrent] = useState(0)
  const [videoPlayback, setVideoPlayback] = useState(true);

  const videoRef = createRef();

  // useEffect(() => {
  //   if (slidesData[current]['mediaType'] === 'image') {
  //     var timer = setTimeout(() => {
  //       setCurrent(current === slideLimit - 1 ? 0 : current + 1)
  //     }, displayDuration)
  //   }
  //   return () => {
  //     clearTimeout(timer)
  //   }

  // }, [current])

  const onPlaybackClick = () => {
    if(!videoPlayback){
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setVideoPlayback(!videoPlayback)
  };

  const onNextSlide = () => {
    setCurrent(current === slideLimit - 1 ? 0 : current + 1);
  }

  const onPrevSlide = () => {
    setCurrent(current === 0 ? slideLimit - 1 : current - 1);

  }

  const onDirectToSlide = (slideIndex = 0) => {
    console.log('direct to:', slideIndex)
    setCurrent(slideIndex)
  }

  const renderSlides = () => {
    return slidesData.map((slide, index) => {
      const { headline, body, ctaText, ctaLink, mediaType, src } = slide
      return (
        index === current && (<Slide headline={headline} body={body} ctaText={ctaText} ctaLink={ctaLink} mediaType={mediaType} src={src} current={current} index={index} onClick={onPlaybackClick} videoRef={videoRef} />)
      )
    })
  }

  const renderSlidesNav = () => {
    let navButtonList = []
    for (let i = 0; i < slideLimit; i++) {
      if (i < slideLimit) {
        navButtonList.push(<li key={i} className="carousel-direct-slide-link"><button  onClick={() => { onDirectToSlide(i) }} className={current === i ? 'active' : null}>&nbsp;</button></li>)
      }
    }
    return navButtonList;
  }

  if (!Array.isArray(slidesData) || slidesData.length <= 0 ) {
    return 'no show';
  }

  return (
    <div className="carousel-block">
      { renderSlides() }
      <div className="carousel-block-navigation">

        <button className="arrow-button" onClick={onPrevSlide} ><FaArrowCircleLeft  /></button>
        <ul>
          {slidesData[current]['mediaType'] === 'video' ? <li class="video-control-block"><button className="video-control-button" onClick={onPlaybackClick}>{videoPlayback ? "Pause Video" : "Play Video"}</button></li> : <li style={{ height: 48, width: '100%' }}></li>}
          {renderSlidesNav()}
        </ul>
        <button className="arrow-button" onClick={onNextSlide}><FaArrowCircleRight /></button>
      </div>
    </div>
  )
}