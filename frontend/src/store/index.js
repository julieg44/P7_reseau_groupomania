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

// alerte
// function customAlert (){
//   this.render = function(dialog){
//       let winW = window.innerWidth;
//       let winH = window.innerHeight;
//       let popup = document.getElementById ('popup');
//       let popupContent = document.getElementById ('popup-content');
//       popup.style.display = 'block';
//       popup.style.height = winH + 'px';
//       popupContent.style.left = (winW/2) - (980 * .5) + 'px';
//       if (winW < 569){
//           popupContent.style.left = (winW/2) - (260 * .5) + 'px';
//       }
//       popupContent.style.display = "block";
//       document.getElementById('popup-head').innerHTML = ' <button id="fermer"> X </button> ';
//       document.getElementById('popup-text').innerHTML = dialog;
//       let buttonAlert = document.getElementById('fermer');
//       buttonAlert.addEventListener ('click', function(){
//         window.location.href = '/'
//       })
//   }
//   this.ok = function(){
//       document.getElementById('popup').style.display = 'none';
//       document.getElementById('popup-content').style.display = 'none';
//   }
// }

export default new Vuex.Store({
  state: {
    users:[],
    selectedUser: null,
    token: null,
  },
  mutations: {

    LoggedUserId(state, userId){
      state.selectedUser = userId;
      console.log(state.selectedUser)
    },
    LoggedToken(state, token){
      state.token = token;
      console.log(state.token);
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
          let userlogged = response.data
          localStorage.setItem('usertoken', JSON.stringify(userlogged.token));
          localStorage.setItem('userId',JSON.stringify(userlogged.userId))
          context.commit('LoggedUserId', userlogged.userId)
          context.commit('LoggedToken', userlogged.token)
          console.log(localStorage)
          debugger;
          window.location.href = '/main/'+ userlogged.userId;
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
        console.log(user)
        return user;
    },

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

    deconnect(){
      localStorage.clear()
      window.location.href = '/';
    },

    modifyUser(){

    },

    supUser(context){
      //@todo  => alert sure ??
      console.log(context.state.selectedUser.id)
      let token = 'Bearer ' + context.state.token;
      axios.delete(urlApi+'/api/user/' + context.state.selectedUser.id, {
        headers: { 'Authorization': token }}) 
        .then(function () {
        window.location.href = '/'
        })
    },  
  },  

  modules: {
  },

  // getters: {
  //   loadUser:(state) => (payload)=>{
  //     // let usertoken = JSON.parse(localStorage.getItem('usertoken'))
  //     let token = 'Bearer '+ state.token;
  //     console.log(token);
  //     // console.log(payload)
  //     console.log(this.state.token)
  //     console.log('trop tot')

  //     // context.commit('LoggedUser', JSON.parse(localStorage.getItem('userData')))

 
  //     axios.get(urlApi + '/api/user/' + payload.id, {
  //       headers: { 'Authorization': token }})



  
  //       .then(function (response) {
  //         // handle success 
  //         console.log('trop tard')

  //         console.log(response.data)

  //         return (response.data);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       })
  //       .then(function () {
  //         // always executed
  //       })

  //   },
  // },
})
