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
//         window.location.href = '/main/'+ newUser._id
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
    AddUser(state, newUser){
      state.users.push(newUser);
      console.log(state.users)
    },
    setLoggedUser(state, data){
      console.log(data)
      state.selectedUser = data.user;
      state.token = data.token
      console.log(state.selectedUser)
    }
  },
  actions: {

    login(context, payload){
      let user = { email:payload.email, password:payload.password };
      axios.post('http://localhost:3000/api/auth/login', user)
        .then(function (response) {
          window.location.href = '/main/'+ response.data.user.id;
          context.commit('setLoggedUser', response.data)
        })
    },

    loadUser(context){
      axios.get('http://localhost:3000/api/profil/'+ 19)
        .then(function (response) {
          // handle success
          let data = response.data;
          console.log(response)
          console.log(data)
          context.commit('setLoggedUser', data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },

    signup(context, payload){
      console.log(context)
      let user = { email:payload.email, username:payload.username, password:payload.password, isAdmin:false };
      axios.post('http://localhost:3000/api/auth/signup', user)
        .then(function (response) {
          console.log(response.data.data);
          let userCreated = response.data.data;
          let newUser = new User (userCreated.email, userCreated.username, userCreated.password, userCreated.isAdmin, userCreated.id);
            console.log(newUser)
            context.commit('AddUser', newUser)
            window.location.href = '/main/'+ newUser._id
            // let alert = new customAlert();
            // alert.render("Bienvenue " + newUser.username + " ! <span style='font-size:1.5rem'> </br> Votre compte à été créé </span>")
          })
    },
  },  
  modules: {
  },

  getters: {
    findOne:(state)=>(id)=>{
      let indiv = null;
      console.log(id);
      console.log(state.users[0])
      state.users.forEach(item => {
        console.log(item)
        if (id === item._id){
          console.log('salut')
           indiv = item 
        }
      })
      return indiv;
    }
  },
})
