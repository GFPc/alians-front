import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";

import Dots from "./components/Controls/Dots";


export const SliderContext = createContext(undefined);

const CustomSlider = function ({ children, items}) {
    items = children
    const [slide, setSlide] = useState(0);

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

        if (direction > 8) {
            changeSlide(1);
        }

        if (direction < -8) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    }
    return (
        <div

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
                    {
                        children.length !== 0 ?
                            children.map((Children,index) => (
                                <div className="slide">
                                    {Children}
                                </div>
                            )) : null
                    }
                </div>
                <Dots />
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
