import React from "react";
import '../Home/HomePageStyle_0.css'
import '../Home/HomePageStyle_1_adaptive.css'
import {API_LINK, GetData} from "../../../tools/api";
import Footer from "../../../components/Footer/Footer";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/navigation'
import Header from "../../../components/Header/Header";
import {Loader} from "../../../components/Loader/Loader";
class Objects extends React.Component {
    constructor() {
        super();
        this.state = {
            objects: [],
            modalImage: null,
            modalOpen: false,
            isMobile: false,
            type: window.location.href.split("/")[window.location.href.split("/").length - 1],
        }
        this.LoadObjects = this.LoadObjects.bind(this)
    }
    isMobile() {
        if(window.innerWidth <= 768) {
            return true
        }
    }

    componentDidMount() {
        this.LoadObjects()
    }
    async LoadObjects() {
        var objects =  await GetData(API_LINK+"/objects",{"filter":this.state.type},"post")
        this.setState({
            objects: objects
        })
        if(this.isMobile()) {
            for (var i = 0; i < objects.length; i++) {
                /*
                * for(var j = 0; j < objects[i].images.id_list.length; j++) {
                    objects[i].images.id_list[j] = "mobile_" + objects[i].images.id_list[j]
                }*/
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
    }


    render() {
        if(this.state.objects.length === 0) {
            return (
                <div>
                    <Loader/>
                </div>
            )
        }

        return (
            <div className="page">
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
                    <div className="block-1">
                        <div className="block-header">
                            <span>Наши объекты</span>
                        </div>
                        <div className="objects-type-switcher">
                            <div className={(this.state.type === "commercial") ? " switcher-btn-active" : "switcher-btn"} onClick={() => {
                                this.setState({type: "commercial"})
                                this.LoadObjects()
                            }}>
                                <span>Коммерческие</span>
                            </div>
                            <div className={(this.state.type === "residential") ? " switcher-btn-active" : "switcher-btn"} onClick={() => {
                                this.setState({type: "residential"})
                                this.LoadObjects()
                            }}>
                                <span>Жилые</span>
                            </div>
                        </div>
                        <div className="objects-container">
                            <div className="objects" id={"objects"}>
                                {
                                    !this.state.objects || this.state.objects.length === 0 ? <div>

                                        </div> :
                                        this.state.objects.map((object)=>{

                                            return <div className="object">
                                                <div>
                                                    { object.img_srcs ?
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
                                                                borderRadius: "40px"
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
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Objects