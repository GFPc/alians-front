import React, { useContext } from "react";
import Slide from "./Slide";

import "../styles.scss";
import {SliderContext} from "../Slider";
import Arrows from "./Controls/Arrows";

export default function SlidesList(onDelete) {
  const { slideNumber, items} = useContext(SliderContext);
  onDelete(0)
  console.log(onDelete)
  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {
        items.map((slide, index) => (
            <div className="slide">

              <Arrows onDelete={onDelete} onDeleteData={index}/>
              <img src={slide.url} alt={""} className="slide-image" style={{maxHeight: "500px", maxWidth: "1000px"}} />
            </div>
        ))
      }
    </div>
  );
}
