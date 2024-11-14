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
import CustomSlider from "../../../components/CustomSlider/CustomSlider";
import LoadingAnimation from "../../../components/loadingAnimation";
class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            objects: [],
            modalImage: null,
            modalOpen: false,
            isMobile: false,
            type: "commercial",
            news: [],
            menuOpen: false,
            scrollDirection: "",
            objectsImagesLoaded: {},
            newsImagesLoaded: {}
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
                objects: objects,
            })
        }
    }
    async LoadNews() {
        GetData(API_LINK + "/news",{"start":0,"count":3},"post")
            .then((data) => {
                var news = data
                this.setState(
                    {news:news}
                )
                var new_news = []
                for(let i = 0; i < news.length; i++){
                    new_news.push(news[i])
                    var urls = []
                    for(let j = 0; j < JSON.parse(news[i].img_id).id_list.length; j++){
                        urls.push(API_LINK+"/sources/image/"+JSON.parse(news[i].img_id).id_list[j])
                        if(!this.state.newsImagesLoaded[API_LINK+"/sources/image/"+JSON.parse(news[i].img_id).id_list[j]]) {
                            this.state.newsImagesLoaded[API_LINK+"/sources/image/"+JSON.parse(news[i].img_id).id_list[j]] = false
                        }
                    }
                    new_news[i].img = urls
                    this.setState({
                        news: new_news
                    })
                }

            })  
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
        if(window.location.pathname !== "/"){
            var element_id = window.location.pathname.slice(1)
            document.getElementById(element_id).scrollIntoView({behavior: "smooth"})
        }
        if(this.state.menuOpen){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "auto";
        }
        return (
            <div className="page home-page" style={{overflow: this.state.menuOpen ? "hidden" : "unset"}}>
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
                <Header menuOpen={this.state.menuOpen} setMenuOpen={() => this.setState({menuOpen: !this.state.menuOpen})} scrollDirection={this.state.scrollDirection}/>
                <div className="content">
                    <div className="block-0" >
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
                            <span className="title">Последние <br/>{this.state.type === "commercial" ? "коммерческие" : "жилые"} {this.isMobile() ? <br/> : <></>} объекты</span>
                        </div>
                        <div className="objects-type-switcher" style={{marginTop: "20px"}}>
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
                        <div className="block-last-commercial-objects-items" id={"block-last-commercial-objects-items"}>
                            <CustomSlider
                                items={[]}
                            >
                                {
                                    this.state.objects.map((object) => {
                                        return (
                                            <div className="block-last-commercial-objects-item" style={{
                                                maxWidth: "640px",
                                            }}>
                                                <div className="object">
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
                                                                                height: "0px",
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
                                            </div>
                                        )
                                    })
                                }
                            </CustomSlider>
                        </div>
                        <div className="see-all-btn-wrapper">
                            <div className="see-all-btn" onClick={()=>{ window.location.href = "/objects/commercial"}}>
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
                                <CustomSlider
                                    items={[]}
                                    slideMaxWidth={this.isMobile() ? "340px" : "640px"}
                                    dotsVisible={!this.isMobile()}
                                >
                                {this.state.news.map((item) => {
                                    return (

                                        <div className="block-last-news-item">
                                            <div className="slider-container"
                                                 style={{display: "flex",
                                                     justifyContent: "center",
                                                     alignItems: "center",
                                                     maxWidth: this.isMobile() ? "300px" : "600px",
                                                 }}
                                            >
                                                <Swiper

                                                    allowTouchMove={false}
                                                    // install Swiper modules
                                                    modules={[Navigation]}
                                                    navigation={true}
                                                    width={this.isMobile() ? 400 : 600}
                                                    height={400}
                                                    onTouchMove={(e) => e.stopPropagation()}
                                                    style={{
                                                        borderRadius: this.isMobile() ? "10px" : "40px",
                                                    }}
                                                >
                                                    {
                                                        item.img.map((img) => (
                                                            <SwiperSlide style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                                                <img
                                                                    style={{
                                                                        height: "100%",
                                                                        width: "100%",
                                                                        display: "block",
                                                                        opacity: this.state.newsImagesLoaded[img] ? "1" : "0",
                                                                        transition: "0.5s ease-in-out",
                                                                    }}
                                                                    src={img}
                                                                    className={"news-img"}
                                                                    alt=""
                                                                    onClick={() => this.setState({modalImage: img,modalOpen: true})}
                                                                    onLoad={(e) => {
                                                                        var newsImagesFlags = this.state.newsImagesLoaded
                                                                        newsImagesFlags[img] = true
                                                                        this.setState({newsImagesLoaded: newsImagesFlags})
                                                                    }}
                                                                />
                                                                {
                                                                    this.state.newsImagesLoaded[img] ? <></> :
                                                                        <div style={{
                                                                            width: "100%",
                                                                            height: this.isMobile() ? "200px" : "400px",
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
                                    )
                                })}
                                </CustomSlider>
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