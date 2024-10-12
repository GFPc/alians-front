import React from "react";
import './HomePageStyle_0.css'
import './HomePageStyle_1_adaptive.css'
import {API_LINK, GetData} from "../../../tools/api";
import Footer from "../../../components/Footer/Footer";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/navigation'
import Header from "../../../components/Header/Header";
import {Loader} from "../../../components/Loader/Loader";
import Slider from "../../../components/Slider/Slider";
import CustomSlider from "../../../components/CustomSlider/CustomSlider";
class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            objects: [],
            modalImage: null,
            modalOpen: false,
            isMobile: false,
            type: "commercial",
            news: []
        }
        this.LoadObjects = this.LoadObjects.bind(this)
        this.LoadNews = this.LoadNews.bind(this)
    }
    isMobile() {
        if(window.innerWidth <= 768) {
            return true
        }
    }

    componentDidMount() {
        this.LoadObjects()
        this.LoadNews()
    }
    async LoadObjects() {
        var objects =  await GetData(API_LINK+"/objects",{"filter":this.state.type,"sort":"new","count":3},"post")
        this.setState({
            objects: objects
        })
        if(this.isMobile()) {
            for (var i = 0; i < objects.length; i++) {
                /*
                * for(var j = 0; j < objects[i].images.id_list.length; j++) {
                    objects[i].images.id_list[j] = "mobile_" + objects[i].images.id_list[j]
                }*/
                console.log(objects[i].images.id_list.length)
                objects[i].img_srcs = await GetData(API_LINK+"/src/img",{id_list:objects[i].images.id_list},"post")

                for(var j = 0; j < objects[i].img_srcs.length; j++) {
                    objects[i].img_srcs[j] = {
                        description:objects[i].img_srcs[j].id,
                        url:objects[i].img_srcs[j].data
                    }
                }
                this.setState({
                    objects: objects
                })
            }
        } else {
            for (var i = 0; i < objects.length; i++) {
                objects[i].img_srcs = await GetData(API_LINK+"/src/img",{id_list:objects[i].images.id_list},"post")
                for(var j = 0; j < objects[i].img_srcs.length; j++) {
                    objects[i].img_srcs[j] = {
                        description:objects[i].img_srcs[j].id,
                        url:objects[i].img_srcs[j].data
                    }
                }
            }
            this.setState({
                objects: objects
            })
        }
        console.log(objects)
    }
    async LoadNews() {
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


    render() {
        if(this.state.objects.length === 0) {
            return (
                <div>
                    <Loader/>
                </div>
            )
        }
        if(window.location.pathname !== "/"){
            var element_id = window.location.pathname.slice(1)

            document.getElementById(element_id).scrollIntoView({behavior: "smooth"})
        }
        return (
            <div className="page home-page">
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
                <Header />
                <div className="content">
                    <div className="block-0">
                        <div className="about" id={"about"}>
                            <span className={"about-title"}>Альянс Строй</span>
                            <span className="about-text">Компания "Альянс Строй" - это ведущая строительная организация, которая специализируется на реализации разнообразных проектов в области строительства и ремонта. Мы предлагаем широкий спектр услуг и гарантируем высокое качество исполнения всех работ.</span>
                            <span className="about-text">Наша компания имеет богатый опыт работы на строительном рынке, что позволяет нам успешно реализовывать как небольшие частные заказы, так и крупные коммерческие проекты. Мы готовы взяться за любую задачу и обеспечить клиентов надежными строительными решениями.</span>
                            <div className="go-to-btn" onClick={() => document.getElementById("block-last-commercial-objects-items").scrollIntoView({behavior: "smooth"})}>
                                <span>Перейти к объектам</span>
                            </div>
                        </div>
                        <div className="block-0-logo">
                            <img src={"company-logo.svg"} alt=""/>
                        </div>
                    </div>
                    <div className="block-last-commercial-objects">
                        <div className="block-last-commercial-objects-title">
                            <span className="title">Последние коммерческие {this.isMobile() ? <br/> : <></>} объекты</span>
                        </div>
                        <div className="block-last-commercial-objects-items" id={"block-last-commercial-objects-items"}>
                            <CustomSlider
                                items={[]}
                            >
                                {
                                    this.state.objects.map((object) => {
                                        return (
                                            <div className="block-last-commercial-objects-item">
                                                <div className="object">
                                                    <div>
                                                        { object.img_srcs ?
                                                            <Swiper
                                                                allowTouchMove={false}
                                                                // install Swiper modules
                                                                modules={[Navigation]}
                                                                navigation={true}
                                                                width={this.isMobile() ? 400 : 600}
                                                                height={600}
                                                                style={{
                                                                    borderRadius: "40px",
                                                                    userSelect: "none",
                                                                }}
                                                            >
                                                                {
                                                                    object.img_srcs.map((item, index) => (
                                                                        <SwiperSlide><img src={item.url} alt="" onClick={() => this.setState({modalImage: item.url,modalOpen: true})}/></SwiperSlide>
                                                                    ))
                                                                }
                                                            </Swiper> :<div style={{
                                                                width: "100%",
                                                                height: this.isMobile() ? "300px" : "400px",
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
                                                    <div className="object-data">
                                                        <div className="section">
                                                            <span className="object-name">{object.name}</span>
                                                            <span className="object-address">{object.address}</span>
                                                            {
                                                                !object.specifications || object.specifications.length === 0 ? null :
                                                                    object.specifications.map( (feature) => <span className="object-feature">{feature}</span> )
                                                            }


                                                            <div className="look-btn" onClick={() => window.location.href = "/object/"+object.id}>
                                                                <span>Посмотреть</span>
                                                            </div>
                                                        </div>
                                                        <div className="section">
                                                            <div className="price">
                                                                <span>От&nbsp;</span>
                                                                <span className={"bold"}>{object.low_price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </CustomSlider>
                        </div>
                        <div className="see-all-btn-wrapper">
                            <div className="see-all-btn">
                                <span>Смотреть больше</span>
                            </div>
                        </div>
                    </div>
                    <div className="block-last-news">
                        <div className="last-news-header">
                            <span>Последние новости</span>
                        </div>
                        <div className="center-aligner">
                            <div className="last-news-content">
                                {this.state.news.map((item) => {
                                    return (

                                        <div className="block-last-news-item-wrapper">
                                            <div className="block-last-news-item">
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
                                                            width={this.isMobile()? window.innerWidth - 50 : 600}

                                                            style={{
                                                                borderRadius: this.isMobile() ? "10px" : "40px",

                                                            }}
                                                        >
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
                </div>
                <Footer />
            </div>
        )
    }
}
export default HomePage