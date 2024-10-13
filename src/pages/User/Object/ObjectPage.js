import React from "react";
import withRouter from "../../../tools/WithRouter";
import Header from "../../../components/Header/Header";
import {API_LINK, GetData} from "../../../tools/api";
import Footer from "../../../components/Footer/Footer";
import "./ObjectPageStyle_0.css"
import "./ObjectPageStyle_1_adaptive.css"
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import ImageViewer from 'react-simple-image-viewer';
class ObjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object_id: this.props.params.object_id,
            images: [],
            name: "",
            address: "",
            priceFrom: 0,
            priceTo: 0,
            features: [],
            specifications: [],
            contacts: [],
            description: "",

            modalImageUrl: "",
            modalOpen: false,
            dataReceived: false,
            menuOpen: false
        }
    }

    componentDidMount() {
        this.LoadObjects().then(r => {
            this.setState({
                images: r.img_srcs,
            })
        })
    }
    async LoadObjects() {
        var object =  await GetData(API_LINK+"/object",{object_id: this.state.object_id},"post")
        this.setState({
            dataReceived: true,
            name: object.name,
            address: object.address,
            priceFrom: object.low_price,
            priceTo: object.high_price,
            features: object.features,
            specifications: object.specifications,
            contacts: object.contacts,
            description: object.description
        })
        object.img_srcs = await GetData(API_LINK+"/src/img",{id_list:object.images.id_list},"post")
        var images = object.img_srcs
        for(var i = 0; i < images.length; i++){
            images[i] = {
                url: images[i].data,
                title: images[i].id
            }
        }
        return object
    }
    isMobile() {
        if(window.innerWidth <= 768) {
            return true
        }
    }

    render() {
        console.log(this.isMobile() ? "mobile" : "desktop")
        if(!this.state.dataReceived || this.state.images.length === 0) {
            return (
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div class="inner three"></div>
                </div>
            )
        }
        if(this.state.menuOpen){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "auto";
        }
        return (
            <div className="page" style={{overflow: this.state.menuOpen ? "hidden" : "auto"}}>
                <div className="modal"
                     style={{
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
                >
                    <div className="modal-content">
                        {//<img src={this.state.modalImageUrl} alt="" style={{scale: "2"}}/>
                        }
                        <ImageViewer
                            src={ [this.state.modalImageUrl] }
                            currentIndex={0}
                            disableScroll={ true }
                            closeOnClickOutside={ true }
                        />
                    </div>
                    <div className="modal-close" onClick={() => this.setState({modalOpen: false})}>X</div>
                </div>
                <Header menuOpen={this.state.menuOpen} setMenuOpen={() => this.setState({menuOpen: !this.state.menuOpen})}/>
                <div className="content">
                    <div className="block-6">
                        <div className="container">
                            {
                                this.state.images.length > 0 ? <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        navigation={(!this.isMobile())}
                                        spaceBetween={this.isMobile() ? 100 : 2}
                                        slidesPerView={1}
                                        pagination={{ clickable: true }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                        width={this.isMobile() ? 300 : 600}
                                        height={this.isMobile() ? 300 : 600}
                                        style={{
                                            borderRadius: "40px",
                                            maxWidth: "600px"
                                        }}
                                    >
                                        {
                                            this.state.images.map((item, index) => (
                                                <SwiperSlide style={{width: "800px", height: "400px"}} onClick={ () => this.setState({modalImageUrl: item.url,modalOpen: true})}><img src={item.url} alt="" onClick={() => this.setState({modalImage: item.url,modalOpen: true})}/></SwiperSlide>
                                            ))
                                        }
                                    </Swiper> :
                                    <div style={{
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
                        {
                            this.state.dataReceived ? <div>
                                <div className="info-section">
                                    <div className="info-group">
                                    <span className={"object-name"}>
                                        {this.state.name}
                                    </span>
                                        <span className={"object-address"}>
                                        {this.state.address}
                                    </span>
                                        <span className={"price-range-title"}>Диапазон цен</span>
                                        <div className="price-group">
                                        <span className="price-range">
                                            От
                                        </span>
                                            <span>
                                            {this.state.priceFrom}
                                        </span>
                                            <span className="price-range">
                                            до
                                        </span>
                                            <span>
                                            {this.state.priceTo}
                                        </span>
                                        </div>
                                        <span className="technical-features-title">
                                        Технические характеристики
                                    </span>
                                        <div className="technical-features-group">
                                            {
                                                this.state.features.map((feature, index) => {
                                                    return (
                                                        <div className="feature">
                                                     <span>
                                                         <span className={"feature-name"}>{this.state.features[index].name}</span>:&nbsp;{this.state.features[index].value}
                                                     </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <span className="technical-features-title">
                                        Спецификации
                                    </span>
                                        <div className="specifications-group">
                                            {
                                                this.state.specifications.map((specification, index) => {
                                                        return (
                                                            <div className="specification">
                                                            <span>
                                                                {this.state.specifications[index]}
                                                            </span>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                        <span className="contacts-title">
                                        Контакты
                                    </span>

                                        <div className="contacts-group">

                                            {
                                                this.state.contacts.map((contact, index) => {
                                                    return (
                                                        <div className="contact">
                                                            <span>
                                                                <span className={"contact-name"}>{this.state.contacts[index].name}</span>:&nbsp;{this.state.contacts[index].value}&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="description-section">
                                    <div className="description-group">
                                        <div className="description-title">
                                            <span>Описание</span>
                                        </div>
                                        <div className="description-text">
                                            <span>
                                                {this.state.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div></div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(ObjectPage)