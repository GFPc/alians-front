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
            menuOpen: false,
            scrollDirection: "",
            objectsImagesLoaded: {},
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
        var objectImagesFlags = {}
        for (var i = 0; i < objects.length; i++) {
            var urls = []
            for(var j = 0; j < objects[i].images.id_list.length; j++) {
                urls.push({url:API_LINK+"/sources/image/"+objects[i].images.id_list[j]})
                if(!objectImagesFlags[API_LINK+"/sources/image/"+objects[i].images.id_list[j]]) {
                    objectImagesFlags[API_LINK+"/sources/image/"+objects[i].images.id_list[j]] = false
                }
            }
            if(!this.state.objectsImagesLoaded){
                this.setState({
                    objectsImagesLoaded: objectImagesFlags
                })
            }
            objects[i].img_srcs = urls
            this.setState({
                objects: objects
            })
        }
    }
    handleScroll = (e) => {
        if(!e){
            return
        }
        //console.log(e.target.scrollingElement.scrollTop, e.target.scrollingElement)
        if(e.target.scrollingElement.scrollTop === 0) {
            this.setState({
                scrollDirection: "up"
            })
        } else {
            this.setState({
                scrollDirection: "down"
            })
        }
    }

    render() {
        window.addEventListener("scroll", this.handleScroll);
        if(this.state.objects.length === 0) {
            return (
                <div>
                    <Loader/>
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
                <Header menuOpen={this.state.menuOpen} setMenuOpen={() => this.setState({menuOpen: !this.state.menuOpen})} scrollDirection={this.state.scrollDirection}/>
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

                                            return <div className="object" style={{
                                                maxWidth: this.isMobile() ? "400px" : "600px",
                                            }}>
                                                <Swiper
                                                    allowTouchMove={false}
                                                    // install Swiper modules
                                                    modules={[Navigation]}
                                                    navigation={true}
                                                    width={this.isMobile() ? 400 : 600}
                                                    height={400}
                                                    style={{
                                                        borderRadius: "40px",
                                                        userSelect: "none",
                                                    }}
                                                    onTouchMove={(e) => e.stopPropagation()}

                                                >
                                                    {
                                                        object.img_srcs.map((item, index) => (

                                                            <SwiperSlide style={{userSelect: "none",userDrag: "none"}}>
                                                                <img
                                                                    src={item.url}
                                                                    style={{
                                                                        userSelect: "none",
                                                                        display: "block",
                                                                        opacity: this.state.objectsImagesLoaded[item.url] ? "1" : "0",
                                                                        transition: "0.5s ease-in-out",
                                                                    }}
                                                                    alt=""
                                                                    onClick={() => this.setState({modalImage: item.url,modalOpen: true})}
                                                                    onLoad={(e) => {
                                                                        var newObjectsImagesFlags = this.state.objectsImagesLoaded
                                                                        newObjectsImagesFlags[item.url] = true
                                                                        this.setState({objectsImagesLoaded: newObjectsImagesFlags})
                                                                    }}
                                                                />
                                                                {
                                                                    this.state.objectsImagesLoaded[item.url] ? <></> :
                                                                        <div style={{
                                                                            width: "100%",
                                                                            height: "0",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                        }}>

                                                                        </div>

                                                                }

                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper>
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