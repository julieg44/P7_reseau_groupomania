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

    /// messages /////
    getMessages(){
        return appelsAPI.get(URL + '/api/message')
    },
    postMessage(){
        return appelsAPI.post(URL + '/api/message')
    },
    supMessage(id){
        return appelsAPI.delete(URL + '/api/message/' + id)
    },
    getMessagesOneUser(id){
        return appelsAPI.get(URL + '/api/message/user/' + id)
    },

    ///// users /////
    supUser(id){
        return appelsAPI.delete(URL + '/api/user/' + id)
    },
    getUser(id){
        return appelsAPI.get(URL + '/api/user/' + id)
    },
    getAllUsers(){
        return appelsAPI.get(URL + '/api/user')
    },

    //// comments //// 
    getComments(messageId){
        return appelsAPI.get(URL + '/api/comment/message/' + messageId)
    },
    postComment(messageId, comment){
        return appelsAPI.post(URL + '/api/comment/message/' + messageId, comment)
    },


    //// likes /////
    getLike(messageId){
        return appelsAPI.get(URL + '/api/like/message/' + messageId)
    },

}

