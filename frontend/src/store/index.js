import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios');


Vue.use(Vuex)
// base construction d'un user
// class User {
//   constructor (email, username, password, isAdmin, _id){
//     this.email = email;
//     this.username = username;
//     this.password = password;
//     this.isAdmin = false;
//     this._id = _id
//   }
// }

let urlApi = "http://localhost:3000"



export default new Vuex.Store({
  state: {
    users:[],
    selectedUser: null,
    token: null,
  },
  mutations: {

    LoggedUserId(state, userId){
      state.selectedUser = userId;
    },
    LoggedToken(state, token){
      state.token = token;
    }, 
  },
  actions: {
    tryLogin(context){
     let token = JSON.parse(localStorage.getItem('usertoken'))
     let user = JSON.parse(localStorage.getItem('userId'))
     context.commit('LoggedUserId', user)
     context.commit('LoggedToken',token)
    },

    login(context, payload){
      let user = { email:payload.email, password:payload.password };
      axios.post(urlApi+'/api/user/login', user)
        .then(function (response) {
          console.log(response.data)
          let userlogged = response.data
          localStorage.setItem('usertoken', JSON.stringify(userlogged.token));
          localStorage.setItem('userId',JSON.stringify(userlogged.userId))
          context.commit('LoggedUserId', userlogged.userId)
          context.commit('LoggedToken', userlogged.token)
          window.location.href = '/mainBis';
        })
    },

    async loadUser(context, payload){
      let token = 'Bearer '+ this.state.token;
      let user = await axios.get(urlApi + '/api/user/' + payload.id, {
        headers: { 'Authorization': token }}
      )

        .then(function (response) {
          // handle success 
          return (response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        return user;
    },

    // async loadMessages(){
    //   let token = 'Bearer '+ this.state.token;
    //   let message = await axios.get(urlApi + '/api/message',{
    //     headers: { 'Authorization': token }}
    //   )
    //     .then(function(response){
    //       return (response.data);
    //     })
    //     .catch(function (error){
    //       console.log(error);
    //     })
    //     return message;
    // },

    // async loadComments(){

    //   let token = 'Bearer '+ this.state.token;
    //   let message = await axios.get(urlApi + '/api/message',{
    //     headers: { 'Authorization': token }}
    //   )
    //   .then(function(response){
    //     let messages = response.data
    //     for (let i=0 ; i< messages.length; i++){
    //       axios.get(urlApi + '/api/comment/message/' + messages[i].id, {
    //         headers: { 'Authorization': token }}
    //         )
    //     }
          
    //     })
    //     .then(function(response){
    //       console.log(response)
    //       // return (response.data);
    //     })
    //     return message;


    //   }

    

    // async loadComments(){

    //   let token = 'Bearer '+ this.state.token;
    //   let comment = await axios.get(urlApi + '/api/comment/message/3',{
    //     headers: { 'Authorization': token }}
    //   )
    //     .then(function(response){
    //       return (response.data);
    //     })
    //     .catch(function (error){
    //       console.log(error);
    //     })
    //     console.log(comment)
    //     return comment;
    // },

    // signup(context, payload){
    //   localStorage.clear()
    //   console.log(payload)
    //   let user = { email:payload.email, username:payload.username, password:payload.password, isAdmin:false, photo:payload.photo };
    //   axios.post(urlApi+'/api/user/signup', user)
    //     .then(function (response) {
    //       console.log(response)
    //       // let userCreated = response.data.data;
    //       // let newUser = new User (userCreated.email, userCreated.username, userCreated.password, userCreated.isAdmin, userCreated.id);
    //       //   console.log(newUser)
    //       //   context.commit('setLogged', newUser)
    //         let alert = new customAlert();
    //         alert.render("Bienvenue " + response.data.user.username + " ! <span style='font-size:1.5rem'> </br> Votre compte à été créé, vous pouvez désormais vous connecter</span>")
    //       })
    // },


    // deconnect(){
    //   localStorage.clear()
    //   window.location.href = '/';
    // },


    // supUser(context){
    //   //@todo  => alert sure ??
    //   console.log(context.state.selectedUser.id)
    //   let token = 'Bearer ' + context.state.token;
    //   axios.delete(urlApi+'/api/user/' + context.state.selectedUser.id, {
    //     headers: { 'Authorization': token }}) 
    //     .then(function () {
    //     window.location.href = '/'
    //     })
    // },  
  },  

  modules: {
  },

})
