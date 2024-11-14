import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";

import Dots from "./components/Controls/Dots";


export const SliderContext = createContext(undefined);

const CustomSlider = function ({ children, items,dotsVisible = true,slideMaxWidth="100%"}) {
    items = children
    const [slide, setSlide] = useState(0);
    const [sw_effect, setSwEffect] = useState(0);
    const [direction, setDirection] = useState(0);
    const [transition, setTransition] = useState(0);

    const [touchPosition, setTouchPosition] = useState(null)

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = 0;
        }  else if(slide + direction >= items.length){
            slideNumber = items.length - 1
        }
        else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);
    };

    const goToSlide = (number) => {
        setSlide(number % items.length);
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
        setTransition(0)
        //console.log("touch start")
    }
    const handleTouchEnd = (e) => {
        setSwEffect(0)
        setTouchPosition(null);
        setTransition(0.3)
        if (direction > 80) {
            //console.log("right")
            changeSlide(1);
        }

        if (direction < -80 ) {
            //console.log("left")
            changeSlide(-1);
        }

        //console.log("touch end")
    }

    const handleTouchMove = (e) => {
        if(items.length===1) return

        if(!e.touches) return
        const currentPosition = e.touches[0].clientX;

        setDirection(touchPosition - currentPosition)
        setSwEffect(direction*100/window.innerWidth)
        //console.log(direction,touchPosition,currentPosition)
    }
    return (
        <div

            className="slider"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onDrag={handleTouchMove}
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
                    style={{
                        maxWidth: slideMaxWidth,
                        transform: `translateX(-${slide * 100}%)`,
                        transition: "transform " + transition + "s ease-in-out",
                    }}
                >
                    {
                        children.length !== 0 ?
                            children.map((Children,index) => (
                                <div className="slide">
                                    {Children}
                                </div>
                            )) : null
                    }
                </div>
                {
                    dotsVisible ? <Dots/> : null
                }
            </SliderContext.Provider>
        </div>
    );
};

CustomSlider.propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};

CustomSlider.defaultProps = {
    autoPlay: false,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%"
};

export default CustomSlider;
