import React from "react";
import withRouter from "../../../tools/WithRouter";
import Header from "../../../components/Header/Header";
import Slider from "../../../components/Slider/Slider";
import {API_LINK, GetData} from "../../../tools/api";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";


class EditObjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object_id: this.props.params.object_id,
            name: "Название",
            address: "Адрес",
            priceFrom: 0,
            priceTo: 0,
            features: [{}],
            specifications: [],
            contacts: [{
                name: "",
                value: ""
            }],
            images: [],
            filesToUpload: [],
            objects: []
        }
        this.LoadObjects = this.LoadObjects.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.submit = this.submit.bind(this)
    }
    addSpecification(){
        if(this.state.specifications.length < 6){
            this.setState({specifications: [...this.state.specifications,""]})
        }
        else{
            alert("Максимальное количество спецификаций - 6")
        }
    }
    deleteSpecification(index){
        this.state.specifications.splice(index, 1)
        this.setState({specifications: this.state.specifications})
    }
    addFeature(){
        if(this.state.features.length < 6){
            this.setState({features: [...this.state.features,""]})
        }
        else{
            alert("Максимальное количество характеристик - 6")
        }
    }
    deleteFeature(index){
        this.state.features.splice(index, 1)
        this.setState({features: this.state.features})
    }
    addContact(){
        if(this.state.contacts.length < 6){
            this.setState({contacts: [...this.state.contacts,{}]})
        }
        else{
            alert("Максимальное количество контактов - 6")
        }
    }
    deleteContact(index){
        if(this.state.contacts.length > 1){
            this.state.contacts.splice(index, 1)
            this.setState({contacts: this.state.contacts})
        }
        else{
            alert("Минимальное количество контактов - 1")
        }
    }
    submit(){
        var price_from = document.getElementById("input-price-from").value
        var price_to = document.getElementById("input-price-to").value
        if(price_from === "" || price_to === "" || this.state.name === "" || this.state.address === ""){
            alert("Заполните все поля")
        }
        for (var i = 0; i < this.state.features.length; i++){
            var feature = document.getElementById("input-feature-name-" + i).value
            var feature_value = document.getElementById("input-feature-value-" + i).value
            if(feature === "" || feature_value === ""){
                alert("Заполните все поля характеристик")
                break
            }
            this.state.features[i] = {name: feature, value: feature_value}
        }
        for(var i = 0; i < this.state.specifications.length; i++){
            var specification = document.getElementById("input-specification-" + i).value
            if(specification === ""){
                alert("Заполните все поля спецификации")
                break
            }
            this.state.specifications[i] = specification
        }
        for (var i = 0; i < this.state.contacts.length; i++){
            var contact_name = document.getElementById("input-contact-name-" + i).value
            var contact_value = document.getElementById("input-contact-value-" + i).value
            if(contact_name === "" || contact_value === ""){
                alert("Заполните все поля контактов")
                break
            }
            this.state.contacts[i].name = contact_name
            this.state.contacts[i].value = contact_value
        }
        var data = {
            name: this.state.name,
            address: this.state.address,
            low_price: price_from,
            high_price: price_to,
            features: this.state.features,
            contacts: this.state.contacts,
            specifications: this.state.specifications,
            description: document.getElementById("input-description").value,

            id: this.state.object_id
        }
        GetData(API_LINK + "/admin/object/edit", data).then(
            (response) => {

                const formData = new FormData();
                this.state.filesToUpload.forEach((file) => {
                    formData.append(file.name, file);
                })
                var img_ids = []
                for(var i = 0; i < this.state.images.length; i++){
                    if (this.state.images[i].title !== undefined){
                        img_ids.push(this.state.images[i].title)
                    }
                }
                formData.append("object_id", this.state.object_id)
                formData.append("img",JSON.stringify(img_ids))

                fetch(API_LINK + "/admin/img/edit", {method: "POST",body: formData,dataType: "jsonp"}).then( response => {
                    alert("Объект успешно отредактирован")
                    window.location.reload()
                })
            }
        )


    }
    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                images: [...this.state.images, {url:URL.createObjectURL(img)}],
                filesToUpload: [...this.state.filesToUpload, img]
            });

        }
    };
    deleteImage(index){
        console.log(index,this.state)
        this.state.images.splice(index, 1)
        this.setState({images: this.state.images})
    }
    async LoadObjects() {
        var objects =  await GetData(API_LINK+"/objects","","get")

        for (var i = 0; i < objects.length; i++) {
            objects[i].img_srcs = await GetData(API_LINK+"/src/img",{id_list:objects[i].images.id_list},"post")
        }
        return objects
    }
    componentDidMount() {
        if(!localStorage.getItem("token")){
            window.location.href = "/login"
        }
        this.LoadObjects().then(r => {
            var object_for_edit = r.filter(object => object.id == this.state.object_id)[0]
            var images = object_for_edit.img_srcs
            for(var i = 0; i < images.length; i++){
                images[i] = {
                    url: images[i].data,
                    title: images[i].id
                }
            }
            console.log(object_for_edit.features)
            this.setState({
                name: object_for_edit.name,
                address: object_for_edit.address,
                features: object_for_edit.features,
                contacts: object_for_edit.contacts,
                specifications: object_for_edit.specifications,
                description: object_for_edit.description,
                images: images,
                priceFrom: object_for_edit.low_price,
                priceTo: object_for_edit.high_price,
                token: localStorage.getItem("token")
            })
        })

    }

    render() {

        return (
            <div className="page">
                <Header />
                <div className="content">
                    <div className="block-3">
                        <div className="block-header">
                            <span>Изменить объект</span>
                        </div>
                        <div className="container">
                            <div className="photos-section" style={{display: "inline-block"}}>
                                <div className="photo-widget">
                                    <Slider items={this.state.images} onDelete={this.deleteImage} startSlide={this.state.images.length - 1} goToEnd={true}/>
                                </div>
                                <div style={{paddingLeft: "50px"}}>
                                    <span style={{fontWeight: "bold", fontSize: "20px",color: "#ffffff", textDecoration: "underline"}} onClick={ ()=>{document.getElementById("input-image").click()}}>
                                        Upload image
                                    </span>
                                    <div>
                                        <input type="file" id={"input-image"} style={{display: "none"}} name="myImage" onChange={this.onImageChange} onClick={()=>{console.log("click")}}/>
                                    </div>
                                </div>

                            </div>
                            <div className="info-section">
                                <div className="info-group">
                                    <span>
                                        <input id={"input-name"} type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                                    </span>
                                    <span>
                                        <input id={"input-address"} type="text" value={this.state.address} onChange={(e) => this.setState({address: e.target.value})}/>
                                    </span>
                                    <span className={"price-range-title"}>Диапазон цен</span>
                                    <div className="price-group">
                                        <span className="price-range">
                                            От
                                        </span>
                                        <span>
                                            <input id={"input-price-from"} type="text" value={this.state.priceFrom} onInput={(e) => this.setState({priceFrom: e.target.value})}/>
                                        </span>
                                        <span className="price-range">
                                            До
                                        </span>
                                        <span>
                                            <input id={"input-price-to"} type="text" value={this.state.priceTo} onInput={(e) => this.setState({priceTo: e.target.value})}/>
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
                                                <form action='' method='post'>
                                                    <input id={"input-feature-name-" + index} size='5' placeholder={"Название"} value={this.state.features[index].name} onInput={(e) => {
                                                        var input = document.getElementById("input-feature-name-" + index);
                                                        input.size = input.value.length > 2 ? input.value.length : 2 + 1
                                                        var feature = this.state.features[index]
                                                        feature.name = input.value
                                                        this.setState({features: this.state.features})
                                                    }}/> :
                                                    <input id={"input-feature-value-" + index} size='5' placeholder={"Название"} value={this.state.features[index].value} onInput={(e) => {
                                                        var input = document.getElementById("input-feature-value-" + index);
                                                        input.size = input.value.length > 2 ? input.value.length : 2 + 1
                                                        var feature = this.state.features[index]
                                                        feature.value = input.value
                                                        this.setState({features: this.state.features})
                                                    }}/>
                                                </form>
                                            </span>
                                                        <div className="delete-btn" onClick={this.deleteFeature.bind(this, index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="add-feature-btn" onClick={() => {this.addFeature()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="technical-features-title">
                                        Спецификации
                                    </span>
                                    <div className="specifications-group">
                                        {
                                            this.state.specifications.map((specification, index) => {
                                                    return (
                                                        <div className="feature">
                                                            <span>
                                                <form action='' method='post'>
                                                    <input id={"input-specification-" + index} size='5' placeholder={"Название"} value={this.state.specifications[index]} onInput={(e) => {
                                                        var input = document.getElementById("input-specification-" + index);
                                                        input.size = input.value.length > 2 ? input.value.length : 2 + 1
                                                        var specification = this.state.specifications[index]
                                                        this.state.specifications[index] = input.value
                                                        this.setState({specifications: this.state.specifications})
                                                    }}/>
                                                </form>
                                            </span>
                                                            <div className="delete-btn" onClick={this.deleteSpecification.bind(this, index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                        <div className="add-feature-btn" onClick={() => {this.addSpecification()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
                                            </svg>
                                        </div>
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
                                                <form action='' method='post'>
                                                    <input id={"input-contact-name-" + index} size='5' placeholder={"Название"} value={this.state.contacts[index].name} onInput={(e) => {
                                                        var input = document.getElementById("input-contact-name-"+index);
                                                        input.size = input.value.length > 2 ? input.value.length : 2 + 1

                                                        var contact = this.state.contacts[index];
                                                        contact.name = input.value
                                                        this.setState({contacts: this.state.contacts})
                                                    }}/>
                                                </form>
                                            </span>
                                                        <span>:</span>
                                                        <span>
                                                <form action='' method='post'>
                                                    <input id={"input-contact-value-" + index} size='5' placeholder={"Значение"} value={this.state.contacts[index].value} onInput={(e) => {
                                                        var input = document.getElementById("input-contact-value-"+index);
                                                        input.size = input.value.length > 2 ? input.value.length : 2 + 1

                                                        var contact = this.state.contacts[index];
                                                        contact.value = input.value
                                                        this.setState({contacts: this.state.contacts})
                                                    }}/>
                                                </form>
                                            </span>
                                                        <div className="delete-btn" onClick={this.deleteContact.bind(this, index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="add-contact-btn" onClick={() => {this.addContact()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="description-section">
                            <div className="description-title">
                                <span>Описание</span>
                            </div>
                            <div className="description">
                                <textarea id="input-description" placeholder="Описание" value={this.state.description} onInput={(e) => {
                                    var input = document.getElementById("input-description");
                                    input.size = input.value.length > 2 ? input.value.length : 2 + 1
                                    var lines_count = input.value.split('\n').length
                                    input.style.height = lines_count * 1.5 + 'em'

                                    this.state.description = input.value
                                    this.setState({description: this.state.description})
                                }}/>
                            </div>
                        </div>
                        <div className="submit-btn" onClick={this.submit}>
                            <span>Применить</span>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default withRouter(EditObjectPage)