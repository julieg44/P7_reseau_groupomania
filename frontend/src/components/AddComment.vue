<template>
    <form class="post-comment" enctype="multipart/form-data">
        <div class="commentaire">
            <div class="positionPhoto">
                <img v-if="userConnected.photo !== null" :src="userConnected.photo" />
                <img v-else src="../assets/avatar.png" />
            </div> 
            <input class="addcomment" type='text' placeholder="Vous souhaitez commenter ?" v-model="content"/>
            <BtnPlus @click="PostComment()"/>
        </div>
    </form>
</template>


<script>
// @ is an alias to /src


import BtnPlus from '@/components/UI/Btn/BtnPlus.vue'
import { mapState } from 'vuex';
import Service from '@/services/service.js'


// const axios = require('axios');
// let urlApi = "http://localhost:3000"


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
            // axios.post(urlApi + '/api/comment/message/' + this.MessageId, Newcomment)
            //    .then(function (response) {
            //        console.log(response)
            //    })
            Service.postComment(this.MessageId, Newcomment)
            .then(function (response) {
                   console.log(response)
               })
               window.location.href="/main"
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


.post-comment {
    width: 100%;
    // margin-top: 3%;
    background-color: $blanc;
    // height: 40px;

}

.commentaire {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // height: 30px;
    align-items: center;
    padding: 1% 3% 1% 3%;
    background-color: $blanc;

    @include tablette_ecran {
        padding: 1%;
    }

    .positionPhoto {
                width: 11%;
                text-align: left;
                margin-right: 2%;
                @include tablette {
                    width: 6%;
                    margin-right: 2%;
                }
                @include ecran {
                    width: 6%;
                    margin-right: 2%;
                }


                img {
                    width: 100%;
                    height: 30px;
                    clip-path:ellipse(50% 50%);
                    @include tablette{
                        margin-right: 5%;
                        height: 30px;
                    }
                    @include ecran{
                        margin-right: 5%;
                        height: 40px;
                    }
                    
                }
            }

    .addcomment {
        text-align: left;
        font-size: 0.7rem;
        border: none;
        width: 87%;
        height: 30px;
    }
}


</style>