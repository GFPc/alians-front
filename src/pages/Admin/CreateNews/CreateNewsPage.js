import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import './CreateNewsPageStyle_0.css'
import Slider from "../../../components/Slider/Slider";
import {API_LINK, GetData} from "../../../tools/api";


class CreateNewsPage extends React.Component{
    constructor() {
        super();
        this.state = {
            title: "",
            text: "",
            images: [],
            filesToUpload: []
        }
        this.onImageChange = this.onImageChange.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.createNews = this.createNews.bind(this)
    }

    componentDidMount() {
        if(!localStorage.getItem("token")){
            window.location.href = "/login"
        }
    }
    createNews(){
        var data = {
            title: this.state.title,
            text: this.state.text,
            token: localStorage.getItem("token")
        }
        GetData(API_LINK + "/admin/news/create", data).then(
            (response) => {

                const formData = new FormData();
                this.state.filesToUpload.forEach((file) => {
                    formData.append(file.name, file);
                })
                formData.append("data", JSON.stringify({news_id: response.news_id,token:localStorage.getItem("token")}))

                fetch(API_LINK + "/admin/news/img/create", {method: "POST", body: formData, dataType: "jsonp"}).then(
                    (response) => {
                        alert( "Новость успешно создана" )
                        window.location.reload()
                    }
                )

            }
        )
    }
    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            console.log("!!!!!!")
            let img = event.target.files[0];
            console.log({url:URL.createObjectURL(img)})
            this.setState({
                images: [...this.state.images, {url:URL.createObjectURL(img)}],
                filesToUpload: [...this.state.filesToUpload, img]
            })
            console.log(this.state)
        }

    };
    deleteImage(index){
        console.log(index)
        this.state.images.splice(index, 1)
        this.setState({images: this.state.images})
    }

    render(){
        var images = [{url:"https://saransk.kolobox.ru/api/img/mod/products/dd/c1/37955.jpg?"}]
        console.log(this.state.images.length)
        return(
            <div className="page create-news-page" onClick={()=>{console.log(this.state)}}>
                <Header />
                <div className="content">
                    <div className="block-1">
                        <div className="block-header">
                            <span>Создать новость</span>
                        </div>
                        <div className="create-object">
                            <div className="photo">
                                <Slider items={this.state.images} onDelete={this.deleteImage} startSlide={0} goToEnd={true}/>
                                <div style={{paddingLeft: "50px"}}>
                                    <div>
                                        <input type="file" id={"input-image"} style={{display: "none"}} name="myImage" onChange={this.onImageChange} onClick={()=>{console.log("click")}}/>
                                    </div>
                                    <span style={{fontWeight: "bold", fontSize: "20px",color: "#000", textDecoration: "underline"}} onClick={ ()=>{document.getElementById("input-image").click()}}>
                                        Upload image
                                    </span>
                                </div>
                            </div>

                            <div className="info">
                                <div className="title-group">
                                    <span className={"title"}>
                                        Title
                                    </span>
                                    <span>
                                        <input id={"input-name"} type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                                    </span>
                                </div>
                                <div className="text-group">
                                    <span className={"title"}>
                                        Text
                                    </span>
                                    <span>
                                        <textarea id={"input-text"} type="text" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="create-btn-cont">
                            <div className="create-btn" onClick={this.createNews}>
                                <span>Create</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default CreateNewsPage