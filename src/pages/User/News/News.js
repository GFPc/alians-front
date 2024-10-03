import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import './NewsPageStyle_0.css'
import {API_LINK, GetData} from "../../../tools/api";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";


class NewsPage extends React.Component{
    constructor() {
        super();
        this.state = {
            news: [
            ],
            modalOpen: false,
            modalImage: null
        }
    }
    componentDidMount() {

        GetData(API_LINK + "/news",{"start":0,"count":10},"post")
            .then((data) => {
                var news = data
                this.setState(
                    {news:news}
                )
                for(let i = 0; i < news.length; i++){
                    GetData(API_LINK+"/news/img",{id:news[i].id},"post").then((r)=>{
                        news[i].img = r
                        var old_news = this.state.news.find( (x) => x.id === news[i].id )
                        var new_news = [...this.state.news]
                        new_news[new_news.indexOf(old_news)] = news[i]
                        this.setState({news:new_news})
                    })
                }
            })
    }
    isMobile() {
        if(window.innerWidth <= 768) {
            return true
        }
    }
    render() {
        return (
            <div className="news-page page">
                <div className="modal" style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    position: "fixed",
                    display: (!this.state.modalOpen) ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    zIndex: 2,
                }}
                     onClick={() => this.setState({modalOpen: false})}
                     onDrag={(e) => e.stopPropagation()}

                >
                    <img src={this.state.modalImage} alt=""/>
                </div>
                <Header/>

                <div className="content">
                    <div className="block-7">
                        <div className="block-title">
                            Новости
                        </div>
                        <div className="news-content">
                            {this.state.news.map((item) => {
                                return (
                                    <div className="news-item-wrapper">
                                        <div className="news-item">
                                            <div className="slider-container">
                                                { item.img ?
                                                    <Swiper

                                                        // install Swiper modules
                                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                        navigation={(!this.isMobile())}
                                                        spaceBetween={1}
                                                        slidesPerView={1}
                                                        pagination={{ clickable: true }}
                                                        onSlideChange={() => console.log('slide change')}
                                                        width={600}
                                                        height={600}
                                                        style={{
                                                            borderRadius: this.isMobile() ? "10px" : "40px",
                                                            maxWidth: "600px",
                                                        }}
                                                    >
                                                        {
                                                            item.img.map((img) => {
                                                                console.log(img)
                                                            })
                                                        }
                                                        {
                                                            item.img.map((img) => (
                                                                <SwiperSlide><img src={img} className={"news-img"} alt="" onClick={() => this.setState({modalImage: img,modalOpen: true})}/></SwiperSlide>
                                                            ))
                                                        }
                                                    </Swiper> :<div style={{
                                                        width: "100%",
                                                        height: this.isMobile() ? "200px" : "400px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
                                                            width: "20%",
                                                            height: "20%",
                                                        }}>
                                                            <circle cx="4" cy="12" r="0" fill="currentColor">
                                                                <animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/>
                                                                <animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                                <animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4"/>
                                                            </circle>
                                                            <circle cx="4" cy="12" r="3" fill="currentColor">
                                                                <animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/>
                                                                <animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                                <animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4"/>
                                                                <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/>
                                                            </circle>
                                                            <circle cx="12" cy="12" r="3" fill="currentColor">
                                                                <animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/>
                                                                <animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                                <animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4"/>
                                                                <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/>
                                                            </circle>
                                                            <circle cx="20" cy="12" r="3" fill="currentColor">
                                                                <animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                                <animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4"/>
                                                                <animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/>
                                                                <animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/>
                                                            </circle>
                                                        </svg>
                                                    </div>
                                                }
                                            </div>
                                            <div className="info-container">
                                                <div className="news-item-header">
                                                    <div className="news-item-title">
                                                        {item.title}
                                                    </div>
                                                    <div className="news-item-date">
                                                        {item.date}
                                                    </div>
                                                </div>
                                                <div className="news-item-text">
                                                    {item.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default NewsPage