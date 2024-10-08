import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";

import Arrows from "./components/Controls/Arrows";
import Dots from "./components/Controls/Dots";


export const SliderContext = createContext(undefined);

const CustomSlider = function ({ children,width, height, autoPlay, autoPlayTime, items, onDelete,startSlide,goToEnd = false}) {
    const [slide, setSlide] = useState(items.length -1);
    console.log(children)
    items = children

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
