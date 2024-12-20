import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";

import Arrows from "./components/Controls/Arrows";
import Dots from "./components/Controls/Dots";

import SlidesList from "./components/SlidesList";

export const SliderContext = createContext(undefined);

const Slider = function ({ width, height, autoPlay, autoPlayTime, items, onDelete,startSlide,goToEnd = false}) {
  const [slide, setSlide] = useState(items.length -1);

  const [touchPosition, setTouchPosition] = useState(null)

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }

    setSlide(slideNumber);
  };

  const goToSlide = (number) => {
    setSlide(number % items.length);
  };
  useEffect(() => {
    if(goToEnd){
      goToSlide(items.length - 1)
    }
  }, [startSlide]);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  }

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  }

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, slide]); // when images uploaded or slide changed manually we start timer
  return (
    <div
      style={{ width, height }}
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
          items
        }}
      >

        <div
            className="slide-list"
            style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          { items.length != 0 ?
            items.map((slide_data, index) => (
                <div className="slide">

                  <Arrows onDeleteAction={onDelete} onDeleteData={index}/>
                  <img src={slide_data.url} alt={""} className="slide-image"  style={{
                    width:  "500px",
                    height: "500px",
                    objectFit: "cover"}} />
                </div>
            ))
              :
            <div className="slide">
              <div className="no-images-slide" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                width: "600px",
                background: "#3f3f3f",
              }}>
                <span style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#ffffff"
                }}>No images yet</span>
              </div>
            </div>
          }
        </div>
        <Dots />
      </SliderContext.Provider>
    </div>
  );
};

Slider.propTypes = {
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string
};

Slider.defaultProps = {
  autoPlay: false,
  autoPlayTime: 5000,
  width: "100%",
  height: "100%"
};

export default Slider;
