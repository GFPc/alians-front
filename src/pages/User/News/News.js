import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import './NewsPageStyle_0.css'
import '../Home/HomePageStyle_0.css'
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
            modalImage: null,
            menuOpen: false,
            scrollDirection: "",
            newsImagesLoaded:{}
        }
    }
    componentDidMount() {

        GetData(API_LINK + "/news",{"start":0,"count":10},"post")
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
    isMobile() {
        if(window.innerWidth <= 768) {
            return true
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
        if(this.state.menuOpen){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "auto";
        }
        return (
            <div className="news-page page">
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
                    <div className="block-7">
                        <div className="block-title">
                            Новости
                        </div>
                        <div className="news-content">
                            {this.state.news.map((item) => {
                                return (
                                    <div className="news-item-wrapper">
                                        <div className="news-item">
                                            <div className="slider-container"
                                                 style={{display: "flex",
                                                     justifyContent: "center",
                                                     alignItems: "center",
                                                 }}
                                            >
                                                <Swiper

                                                    // install Swiper modules
                                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                    navigation={true}
                                                    spaceBetween={1}
                                                    slidesPerView={1}
                                                    pagination={{ clickable: true }}
                                                    onSlideChange={() => console.log('slide change')}
                                                    width={ this.isMobile() ? 300 : 600}


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