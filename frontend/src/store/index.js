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
      let user = { email:payload.email, username:payload.username, password:payload.password, isAdmin:false };
      console.log(user)
      axios.post('http://localhost:3000/api/auth/signup', user)
        .then(function (response) {
          console.log(response.data);
          let userCreated = response.data.data;
          let newUser = new User (userCreated.username, userCreated.email, userCreated.password, userCreated.id);
            context.commit('AddUser', newUser)
          })
    },
  },
  modules: {
  }
})
