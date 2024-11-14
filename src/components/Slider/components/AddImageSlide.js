import React, {useState} from "react";
import SlideImage from "./SlideImage";

import "./../styles.scss";
import Arrows from "./Controls/Arrows";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const filterBySize = (file) => {
    console.log(file)
    //filter out images larger than 5MB
    return file.size <= 10242880;
};
export default function AddImageSlide() {
    const [image, setImage] = useState()
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(URL.createObjectURL(img))
        }
    };
    return (
        <div className="slide" style={{background: "white", width: "100%", height: "100%"}}>
            <div style={{width: "100%", height: "100%","display": "flex",justifyContent: "center",alignItems: "center"}}>

                <div style={{display : "block"}} onClick={()=>{console.log("click")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8L12 16" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 11L12.087 8.08704V8.08704C12.039 8.03897 11.961 8.03897 11.913 8.08704V8.08704L9 11" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 15L3 16L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 16L21 15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div style={{paddingLeft: "50px"}}>
                    <span style={{fontWeight: "bold"}}>
                        Upload image
                    </span>
                    <div>
                        <img src={image} />
                        <input type="file" name="myImage" onChange={onImageChange} onClick={()=>{console.log("click")}}/>
                    </div>
                </div>
                <Arrows/>
            </div>


        </div>
    );
}
