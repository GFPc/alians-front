import React from 'react';
import './Footer.css';


const Footer = () => {
    return (
        <div className="footer">
            <div className="column column-last">
                        <span className="big-bold">
                            Альянс Строй
                        </span>
                <span className="medium">
                            Свяжитесь с нами
                        </span>
                <span className="thin">
                            +79130000000
                        </span>
                <span className="thin">aliansstroy@ya.ru</span>
                <div className="icons" id={"contacts"}>
                    <img src="telegram.svg" alt=""/>
                    <img src="vk.svg" alt=""/>
                    <img src="whatsapp.svg" alt=""/>
                </div>
            </div>

        </div>
    )
}
export default Footer