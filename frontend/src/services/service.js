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
    postMessage(){
        return appelsAPI.post(URL + '/api/message')
    },
    getUser(id){
        return appelsAPI.get(URL + '/api/user/' + id)
    },
    getAllUsers(){
        return appelsAPI.get(URL + '/api/user')
    },
    getComments(messageId){
        return appelsAPI.get(URL + '/api/comment/message/' + messageId)
    },
    getMessagesOneUser(id){
        return appelsAPI.get(URL + '/api/message/user/' + id)
    },
    getLike(messageId){
        return appelsAPI.get(URL + '/api/like/message/' + messageId)
    },

}

