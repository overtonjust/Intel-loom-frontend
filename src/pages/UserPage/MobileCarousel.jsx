import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'



function MobileCarousel() {
    const [autoPlay, setAutoPlay] = useState(true); // State to control auto-scroll

  // Function to stop carousel auto-scroll when video is played
  const handleVideoPlay = () => {
    setAutoPlay(false); // Pause the auto-scroll
  };

  return (
    <Carousel controls={true} indicators={false} interval={autoPlay ? 3000 : null}>
      <Carousel.Item>
        <iframe
          width="100%" 
          height="236" 
          src="https://www.youtube.com/embed/W6NZfCO5SIk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="First slide video"
          onPlay={handleVideoPlay} // Pause auto-scroll when video is played
        ></iframe>
      </Carousel.Item>

      <Carousel.Item>
        <iframe
          width="100%"
          height="236"
          src="https://www.youtube.com/embed/kJOqIaGwQ7Y" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Second slide video"
          onPlay={handleVideoPlay}
        ></iframe>
      </Carousel.Item>

      <Carousel.Item>
        <iframe
          width="100%"
          height="236"
          src="https://www.youtube.com/embed/kqtD5dpn9C8"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Third slide video"
          onPlay={handleVideoPlay}
        ></iframe>
      </Carousel.Item>
    </Carousel>
  );
}

export default MobileCarousel;