import React from 'react';
import './LoginPageStyle_0.css';
import {API_LINK, GetData} from "../../../tools/api";

import Cryptojs from 'crypto-js';
function getSHA256Text(data){
    const sha256Data = Cryptojs.SHA256(data);
    //creates hash object for data using SHA256

    const sha256Text = sha256Data.toString();
    //converts hash object to string

    return sha256Text;
}
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            modal: false
        }
    }
    async Auth() {
        //console.log(this.state.password)
        var data = {
            username: this.state.username,
            password: getSHA256Text(this.state.password)
        }
        this.setState({loading: true})

        var resp = await GetData( API_LINK+"/admin/login", data, "post" )

        if(resp.authorized === true) {
            localStorage.setItem("token", resp.token)
        } else {
            this.setState({loading: false, modal: true})
            return
        }

        setTimeout( () => {
            window.location.href = "/admin/object/create"
        }, 1000)

    }

    render() {
        return (
            <div className={"page login-page"}>
                {
                    this.state.modal ? (<div className="modal" onClick={() => this.setState({modal: false})}>
                        <div className="modal-content">
                            <span>Username or password is incorrect</span>
                        </div>
                    </div>) : null
                }
                <div className="login-form">
                    <div className="form-header">
                        Sign in to <br/>AliansStroy<br/>admin page
                    </div>

                    <div className="inputs-container">
                        <div className="input-container">
                            <input type="text" placeholder="Username" value={this.state.username} onChange={ e => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Password" value={this.state.password} onChange={ e => this.setState({password: e.target.value})} />
                        </div>
                    </div>

                    <div className={"form-btn"} onClick={() => this.Auth()}>
                        {
                            this.state.loading ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="4" cy="12" r="0" fill="currentColor"><animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4"/></circle><circle cx="4" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/></circle></svg>
                                : "Sign in"
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default LoginPage