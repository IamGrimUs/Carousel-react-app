import React from 'react'
import './slide.styles.css'


export const Slide = ({ headline, body, ctaText, ctaLink, mediaType, src, current, index, videoRef }) => {

  return (
    <div className="slide-block">
      <div className="slide-block-background">
        {mediaType === 'image' ? <img alt="" src={src} className={index === current ? 'slide-block-background-img  slide-block-background-img__active' : 'slide-block-background-img'} /> :
          <video ref={videoRef} width="100%" autoplay="" loop={true} poster="data:image/gif,AAAA">
            <source src={src} type="video/mp4">
            </source>
          </video>}
        <div className="slide-block-overlay"></div>
      </div>
      <div className="slide-block-text">
        <h1>{headline}</h1>
        <p>{body}</p>
        <a href={ctaLink}>
          <button tabIndex="1" className="slide-block-text-cta">
            {ctaText}
          </button>
        </a>
      </div>
    </div>
  )

}