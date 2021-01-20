const axios = require('axios');

let tokenUser = 'Bearer' + ' ' + JSON.parse(localStorage.getItem('usertoken'))
let URL = 'http://localhost:3000'

const appelsAPI = axios.create({
    baseUrl: URL,
    widthCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenUser
    }
})

const firstAppelsAPI = axios.create({
    baseUrl: URL,
    widthCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})



export default{

    /// messages /////
    getMessages(){
        return appelsAPI.get(URL + '/api/message')
    },
    getAllMessagesAdmin(page){
        return appelsAPI.get(URL + '/api/message/tri/' + page)
    },
    postMessage(contenu){
        return appelsAPI.post(URL + '/api/message', contenu)
    },
    supMessage(id){
        return appelsAPI.delete(URL + '/api/message/' + id)
    },
    getMessagesOneUser(id){
        return appelsAPI.get(URL + '/api/message/user/' + id)
    },
    //// like ////
    postFirstLike(id,contenu){
        return appelsAPI.post(URL + '/api/like/message/' + id, contenu)
    },

    ///// users /////
    createUser(contenu){
        return firstAppelsAPI.post(URL + '/api/user/signup', contenu)
    },
    login(contenu){
        return firstAppelsAPI.post(URL + '/api/user/login', contenu)
    },
    supUser(id){
        return appelsAPI.delete(URL + '/api/user/' + id)
    },
    getUser(id){
        return appelsAPI.get(URL + '/api/user/' + id)
    },
    getUserFiltre(username){
        return appelsAPI.get(URL + '/api/user/recherche/' + username)
    },
    getAllUsers(){
        return appelsAPI.get(URL + '/api/user')
    },
    getAllUsersAdmin(page){
        return appelsAPI.get(URL + '/api/user/tri/' + page)
    },
    putUser(id, contenu){
        return appelsAPI.put(URL + '/api/user/' + id, contenu)
    },
    supPhotoUser(id){
        return appelsAPI.put(URL + '/api/user/' + id + '/photo')
    },

    //// comments //// 
    getComments(messageId){
        return appelsAPI.get(URL + '/api/comment/message/' + messageId)
    },
    postComment(messageId, comment){
        return appelsAPI.post(URL + '/api/comment/message/' + messageId, comment)
    },
    supComment(id){
        return appelsAPI.delete(URL + '/api/comment/' + id)
    },



    //// likes /////
    getLike(messageId){
        return appelsAPI.get(URL + '/api/like/message/' + messageId + '/like')
    },
    getDislike(messageId){
        return appelsAPI.get(URL + '/api/like/message/' + messageId + '/dislike')
    },
    postLike(messageId, vote){
        return appelsAPI.post(URL + '/api/like/message/' + messageId + '/add', vote)
    },
    supLike(MessageId, UserId){
        return appelsAPI.post(URL + '/api/like/message/' + MessageId + '/' + UserId)
    }

}

