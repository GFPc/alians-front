import axios from "axios";
//147.45.147.209
const API_LINK = "http://147.45.147.209:5000"

const delay_t = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

async function GetData(url,data,method="post"){
    if(method === "post"){
        const response = await axios.post(url,data,{ContentType:"text/plain"})
        return response.data
    }
    else{
        const response = await axios.get(url,data)
        return response.data
    }

}
export {delay_t,
    GetData,
    API_LINK
}