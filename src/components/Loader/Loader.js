import React from 'react';
import './Loader.css';

export const Loader = () => {
    return (
        <div className="loader-screen">
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
            <div className="loader-content">
                <span>Альянс&nbsp;Строй</span>
            </div>
        </div>
    )
}