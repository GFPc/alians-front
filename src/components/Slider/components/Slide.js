import React from "react";

import "./../styles.scss";
import Arrows from "./Controls/Arrows";

export default function Slide({ data: { url, title } }, onDelete, onDeleteData,act) {
    console.log(onDelete,act,onDeleteData)
  return (
    <div className="slide">

        <Arrows onDelete={onDelete} onDeleteData={onDeleteData}/>
        <img src={url} alt={title} className="slide-image" style={{maxHeight: "500px", maxWidth: "1000px"}} />
    </div>
  );
}
