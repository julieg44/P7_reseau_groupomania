const axios = require('axios');

let token = 'Bearer' + ' ' + JSON.parse(localStorage.getItem('usertoken'))
let URL = 'http://localhost:3000'

const appelsAPI = axios.create({
    baseUrl: URL,
    widthCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }
})



export default{
    getMessages(){
        return appelsAPI.get(URL + '/api/message')
    },
    getUser(id){
        return appelsAPI.get(URL + '/api/user/' + id)
    },
    getComments(messageId){
        return appelsAPI.get(URL + '/api/comment/message/' + messageId)
    }
}

