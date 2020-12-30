<template>
  <div>
    <!-- <PopAlert /> -->
    <header>
      <Header />
    </header>
    <section id="section-user">
      <div id='content-user'>
        <EncartProfil :userConnected="userConnected" />
        <div id="content-post">
          <EncartBienvenue :userConnected="userConnected" />
          <EncartPost :userConnected="userConnected"/>
        </div>
      </div>
    </section>


    <!--messages -->
    <section id="filPost" v-if="messages">
      <Post v-for="item in messages"
      :id="item.id" 
      :title="item.title" 
      :createdAt="item.createdAt" 
      :content="item.content"
      :attachment="item.attachment"
      :user="item.User"
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
import EncartProfil from '@/components/EncartProfil.vue'
import EncartBienvenue from '@/components/EncartBienvenue.vue'
import EncartPost from '@/components/EncartPost.vue'
import Post from '@/components/Post.vue'
import Service from '@/services/service.js'




export default {
  name: 'Main',

  components: {
    Header, EncartProfil, EncartPost , EncartBienvenue, Post
  },

  props:['id'],
        

  data() {
    return {
      messages: null,
      // commentaires:null,
      userConnected:null,
    }
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
     },

     created(){
        Service.getUser(this.id)
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
#content-post{
  position: absolute;
  @include tablette_ecran{ 
    position: relative;
    flex-direction: column;
    margin: auto;
    align-items: initial;
    display: flex;
    width: 75%;
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
    margin-top: 25%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}

</style>