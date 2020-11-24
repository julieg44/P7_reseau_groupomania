import Vue from 'vue';
import Vuex from 'vuex';
const axios = require('axios');


Vue.use(Vuex)
// base construction d'un user
class User {
  constructor (email, username, password, isAdmin, _id){
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = false;
    this._id = _id
  }
}

// alerte
function customAlert (){
  this.render = function(dialog){
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let popup = document.getElementById ('popup');
      let popupContent = document.getElementById ('popup-content');
      popup.style.display = 'block';
      popup.style.height = winH + 'px';
      popupContent.style.left = (winW/2) - (980 * .5) + 'px';
      if (winW < 569){
          popupContent.style.left = (winW/2) - (260 * .5) + 'px';
      }
      popupContent.style.display = "block";
      document.getElementById('popup-head').innerHTML = ' <button id="fermer"> X </button> ';
      document.getElementById('popup-text').innerHTML = dialog;
      let buttonAlert = document.getElementById('fermer');
      buttonAlert.addEventListener ('click', function(){
          window.location.href = '/'
      })
  }
  this.ok = function(){
      document.getElementById('popup').style.display = 'none';
      document.getElementById('popup-content').style.display = 'none';
  }
}

export default new Vuex.Store({
  state: {
    users:[],
  },
  mutations: {
    AddUser(state, newUser){
      state.users.push(newUser);
    },
  },
  actions: {
    signup(context, payload){
      console.log(payload)
      let user = { email:payload.email, username:payload.username, password:payload.password, isAdmin:false };
      console.log(user)
      axios.post('http://localhost:3000/api/auth/signup', user)
        .then(function (response) {
          console.log(response.data);
          let userCreated = response.data.data;
          let newUser = new User (userCreated.email, userCreated.username, userCreated.password, userCreated.id);
            console.log(newUser)
            context.commit('AddUser', newUser)
            let alert = new customAlert();
            alert.render("Bienvenue " + newUser.username + " ! <span style='font-size:1.5rem'> </br> Votre compte à été créé </span>")
          })
    },

    login(context, payload){
      let user = { email:payload.email, password:payload.password };
      axios.post('http://localhost:3000/api/auth/login', user)
        .then(function (response) {
          console.log(response);
          })
        .catch(function (response){
          error => response.status(500).json({ error });
          let alert = new customAlert();
          alert.render("utilisateur ou mot de passe incorrect")
        })
    }
  },  
  modules: {
  }
})
