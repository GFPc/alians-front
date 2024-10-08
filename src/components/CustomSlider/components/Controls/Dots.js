import React, { useContext } from "react";
import { SliderContext } from "../../CustomSlider";
import Dot from "./Dot";

import "../../styles.scss";

export default function Dots() {
  const { slidesCount } = useContext(SliderContext);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} number={i} className={"dot" + (i === 0 ? " selected" : "")} />);
    }

    return dots;
  };

  return <div className="dots">{renderDots()}</div>;
}
