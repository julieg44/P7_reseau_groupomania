<template>
  <div>
    <!-- <PopAlert /> -->
    <!-- <header> -->
      <Header />
    <!-- </header> -->
    <Nav :userConnected="userConnected" @affichageUser="showUserOpen()"/>
    <section id="section-user" v-show="showUser">
      <div id='content-user'>
        <EncartProfil :userConnected="userConnected" />
        <div id="content-post">
          <div id="content-bienvenue">
            <EncartBienvenue :userConnected="userConnected" />
            <div class="iconPerso">
              <Search @click="input()" />
              <div v-show="showInput">
                <input id="searchByname" type="text" placeholder="Rechercher un nom" v-model="searchName" />
                <BtnRouge @click="search()" label="Chercher" />
              </div>
              <div id="closeUser" @click="showUserClose()"></div>
            </div>
          </div>
          <EncartPost :userConnected="userConnected" />
        </div>
      </div>
    </section>


    <!--messages -->
    <section id="filPost" v-if="messagesUser">
      <Post v-for="item in messagesUser"
      :id="item.id" 
      :title="item.title" 
      :createdAt="item.createdAt" 
      :content="item.content"
      :attachment="item.attachment"
      :user="item.User"
      :UserId="item.UserId"
      :DecompteLike="item.Likes"
      :Commentaires="item.Comments"
      :key="item.id" 
      :userConnected="userConnected"

      />
    </section>

    <section id="filPost" v-else>
      <Post v-for="item in messages"
      :id="item.id" 
      :title="item.title" 
      :createdAt="item.createdAt" 
      :content="item.content"
      :attachment="item.attachment"
      :user="item.User"
      :DecompteLike="item.Likes"
      :Commentaires="item.Comments"
      :UserId="item.UserId"
      :key="item.id" 
      :userConnected="userConnected"

      />
    </section>


  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
// import PopAlert from '@/components/PopAlert.vue'
import Nav from '@/components/Nav.vue'

import EncartProfil from '@/components/EncartProfil.vue'
import EncartBienvenue from '@/components/EncartBienvenue.vue'
import Search from '@/components/UI/Search.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'

import EncartPost from '@/components/EncartPost.vue'
import Post from '@/components/Post.vue'
import Service from '@/services/service.js'


import { mapState } from "vuex";

export default {
  name: 'Main',

  components: {
    Header, Nav, EncartProfil, EncartPost , EncartBienvenue, Search, BtnRouge, Post
  },

  props:['id'],
        

  data() {
    return {
      messages: null,
      // commentaires:null,
      userConnected:null,
      messagesUser:null,
      showInput: false, 
          searchName:"",
      showUser:false,    
    }
  },

  computed:{
    ...mapState(["selectedUser"])
  },
  
     methods: {
      //     async getMessage() {
      //     let test = await Service.getMessages()
      //     .then(response => { 
      //       for (let i = 0; i < response.data.length; i++) {
      //         let id = response.data[i].UserId;
      //         Service.getUser(id)
      //           .then(response2 => {
      //             let user = {
      //               username: response2.data.username,
      //               photo: response2.data.photo
      //             }
      //             response.data[i].user2 = user
      //           })
      //       }
      //     })
      //     this.messages = test;
      //     console.log(this.messages)
      // }

  input(){
        this.showInput = true
   },

   showUserOpen(){
     this.showUser = true
   },

   showUserClose(){
     this.showUser = false
   },


         async search() {
       let nomrecherche = this.searchName
       await Service.getAllUsers()
           .then(response => {
               for (let i = 0; i < response.data.length; i++) {
                   if (response.data[i].username === nomrecherche) {
                       let idRecherche = response.data[i].id
                       Service.getMessagesOneUser(idRecherche)
                           .then(response2 => {
                               return this.messagesUser = response2.data, this.messages = null
                           })
                   }
               }
           })
   }

     },

     created(){
        Service.getUser(this.selectedUser)
        .then (response => {
          this.userConnected = response.data
        }),

        Service.getMessages()
        .then (response => {
         this.messages = response.data
          })

        // Service.getComments(1)
        // .then (response => {
        //   this.commentaires = response.data
        // })  
     }

    // created() {

    //   Service.getUser(this.id)
    //     .then (response => {
    //       this.userConnected = response.data
    //     })


    //     Service.getMessages()
    //       .then(response => { 
    //       this.messages = response.data

    //         for (let i = 0; i < response.data.length; i++) {
    //           let id = response.data[i].UserId;
    //           Service.getUser(id)
    //             .then(response2 => {
    //               let user = { 
    //                 prenom: response2.data.username,
    //                 avatar: response2.data.photo 
    //                 };
    //               // let user = []
    //               // user.push({ 
    //               //   prenom: response2.data.username,
    //               //   avatar: response2.data.photo
    //               //   })
                  
    //               response.data[i].userQuiAPost = user
    //               this.userQuiAPost = user

    //             })
    //         }
    //       })
    // }
}
</script>


      //  async loadMessages() {
      //    let messages = await this.$store.dispatch('loadMessages')
      //      .then(function (response) {
      //        console.log(response)
      //        return response;
      //      })
      //    return this.messages = messages;
      //  },


      //  async loadComments() {
      //    let commentaires = await this.$store.dispatch('loadComments')
      //      .then(function (response) {
      //        console.log(response)
      //        return response;
      //      })
      //    return this.commentaires = commentaires;
      //  },
            //    async loadProfil() {
            //     let user = await this.$store.dispatch('loadUser', {
            //             id: this.$route.params.id
            //         })
            //         .then(function (response) {
            //             return response;
            //         })
            //     return this.user = user;
            // },




<style lang="scss">

@import "../sass/main.scss";



#section-user{
  // position: fixed;
  // width: 100%;
  // display: none;
  z-index: 10;
  background-color: $blanc;
  padding-top: 1%;
  padding-bottom: 2%;
  @include tablette_ecran{ 
    background-color: $gris1;
    position: fixed;
    width: 100%;
    top: 70px;
  }
}

#content-user{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position:relative;
    @include tablette_ecran{
    display: flex;
    flex-direction: row;
    max-width: 980px;
    margin: auto;
    align-items: initial;
  }
}

#closeUser{
  width: 18%;
                height: 25px;

        background-color: $groupomania-rouge;
        -webkit-mask: url(../assets/close.svg);
        mask: url(../assets/close.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
}
#content-post {
  position: absolute;

  @include tablette_ecran {
    position: relative;
    flex-direction: column;
    margin: auto;
    align-items: initial;
    display: flex;
    width: 75%;

    #content-bienvenue {
      display: flex;
      flex-direction: row;
      .iconPerso {
        width: 15%;
        display: flex;
        justify-content: space-between;
        margin-right: 3%;
        margin-top: 3%;
      }
    }

  }
}



#filPost {
  // width: 100%;
  z-index: 0;
  margin-top: 34%;

  @include tablette_ecran{
    margin-top: 33%;
    max-width: 980px;
    margin: auto;
  }
  @include ecran{
    max-width: 980px;
    margin: auto;
    margin-top: 10%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}

</style>