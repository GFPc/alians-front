import React, { Component } from "react";
import "./st.css";
import ImgsViewer from "react-images-viewer";
import Slider from "../../components/Slider/Slider";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";

class TestPage extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentIndex: 0,
            movement: 0,
        };
    }
    componentDidMount() {
        axios.post("http://192.168.1.64:5000/src/img",{id_list:["24cd0666fd0be9337cc1f379629d569d88e87694dfd9b621e8ce53e5a5d26b46","202123671d714a0bd45dc5f574c335332217492d8f68fde5ec3613dfa41f2554","4d963e1f716276a73255a9f27924af0d662e308758534bba642442a874e2ecd5"]}).then(
            response => {
                this.setState({
                    items: [...this.state.items,...response.data.map(item => {return {url: item.data}})]
                })
            }
        )
    }

    render() {
        console.log(this.state.items.length,this.state.items)
        return (
            <div >
                <Swiper
                    // install Swiper modules
                    modules={[Navigation]} //, Pagination, Scrollbar, A11y
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    width={600}
                    height={400}
                >
                    {
                        this.state.items.map((item, index) => (
                            <SwiperSlide><img src={item.url} alt=""/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        );
    }
}

export default TestPage