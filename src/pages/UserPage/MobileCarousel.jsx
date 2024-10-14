import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'



function MobileCarousel() {
  return (
    <Carousel interval={null}>
      <Carousel.Item>
        <iframe
          width="100%" // Responsive width
          height="236" // Let the height adjust based on aspect ratio
          src="https://www.youtube.com/embed/W6NZfCO5SIk" // Replace with actual YouTube embed link
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="First slide video"
        ></iframe>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <iframe
          width="100%"
          height="236"
          src="https://www.youtube.com/embed/kJOqIaGwQ7Y" // Replace with actual YouTube embed link
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Second slide video"
        ></iframe>
        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <iframe
          width="100%"
          height="236"
          src="https://www.youtube.com/embed/kqtD5dpn9C8" // Replace with actual YouTube embed link
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Third slide video"
        ></iframe>
        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MobileCarousel;