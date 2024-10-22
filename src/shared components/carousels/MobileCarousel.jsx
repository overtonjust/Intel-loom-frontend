// Dependencies
import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'
import './MobileCarousel.scss';


function MobileCarousel({ links, imageArr, alt }) {

  if(imageArr) {
    return(
      <Carousel>
        {imageArr.map((image, index) => (
            <Carousel.Item  key={index}>
              <img className='carousel-img'  src={image} alt={alt} />
            </Carousel.Item>
          )) }
      </Carousel>
    )
  } else if (links) {
    return (
      <Carousel>
        {links.map(({link: li}, index) => (
          <Carousel.Item key={index}>
            <iframe
              width="100%"
              height="260"
              src={li}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="First slide video"
            ></iframe>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}


export default MobileCarousel;