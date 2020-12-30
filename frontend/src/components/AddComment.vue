<template>
    <form class="post-comment" enctype="multipart/form-data">
        <div id="AddComments">
            <div class="positionPhoto">
                <img v-if="userConnected" :src="userConnected.photo" />
                <img class="cacheBleu" src="../assets/avatar-cache-blanc.png" />
            </div>
            
            <input class="addcomment" type='text' placeholder="Vous souhaitez commenter ?" v-model="content"/>
            <!-- <input :value="MessageId" type='hiden' />  -->
            <BtnPlus @click="PostComment()"/>
        </div>
    </form>
</template>


<script>
// @ is an alias to /src


import BtnPlus from '@/components/UI/Btn/BtnPlus.vue'
import { mapState } from 'vuex';

const axios = require('axios');
let urlApi = "http://localhost:3000"


export default {
  name: 'AddComment',
  components: {
      BtnPlus
  },
  props: {
      MessageId: {
          type: Number,
      },

    //   UserId: {
    //       type: Number
    //   },

      userConnected: { type: Object }

  },

  data(){
      return {
          messages: null,
          content:"", 

      }
  },

    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
    },


   methods: {
       PostComment() {
            let Newcomment = {
               UserId: this.userConnected.id,
               UserUsername: this.userConnected.username,               
               UserPhoto: this.userConnected.photo,               
               MessageId: this.MessageId,
               content: this.content,
            }
            axios.post(urlApi + '/api/comment/message/' + this.MessageId, Newcomment)
               .then(function (response) {
                   console.log(response)
               })
           }
           // console.log(this.user.id)
           

         
       },


    //     async loadMessages(){
    //         let message = await this.$store.dispatch('loadMessages')
    //         .then(function (response) {
    //                return response;
    //            })
    //        return this.messages = message;
    //     },

    //    async loadProfil() {
    //        let user = await this.$store.dispatch('loadUser', {
    //                id: this.$route.params.id
    //            })
    //            .then(function (response) {
    //                return response;
    //            })
    //        return this.user = user;
    //    },

   
}


</script>

<style lang="scss">@import "../sass/main.scss";


.post-comment{
    width: 100%;
    margin-top: 3%;
    background-color: $blanc;
    height: 40px;

}

#AddComments {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    // align-items: center;
    padding: 1%;
    background-color: $blanc;
    // position: relative;
    @include tablette_ecran{
        height: 53px;
    }

        .positionPhoto{ 
    // position: absolute;
    // bottom: 7%;
    // width: 5%;
    text-align: left;
    margin-right: 5%;
    @include tablette_ecran {
        // position: absolute;
        // bottom: 7%;
        // width: 60%;
        text-align: left;
    }
        img {
        width: 10%;
        margin-right:1%;
        height: 31px;
        position: absolute;
        @include tablette_ecran{
            width: 39px;
            height: 39px;
        };
    }
        }




    h1 {
        font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-bottom: 0;
        margin-right: 3%;
    }

    .addcomment {
        text-align: left;
        font-size: 0.7rem;
        border: none;
        width: 87%;
        height: 30px;
        margin-left: 8%;
        margin-top: 0.5%;
        @include tablette_ecran{
        margin-left: 2%;
        }
    }

}


</style>