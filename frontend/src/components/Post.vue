<template>
        <div id="message">
            <div class="message-top">
                <div class="positionPhoto">
                    <img v-if="user.photo !== null" :src="user.photo" />
                    <img v-else src="../assets/avatar.png"/>
                </div>
                <h1>{{ user.username }}</h1>
                <p> {{ createdAt }}</p>     
            </div> 
            <h2 id="title">{{ title }}</h2>
            <div class="attachment-post">
                <img class="image-post" v-if="attachment" :src="attachment"/>
            </div>
            <p class="contenuComment">{{ content }}</p> 
            <div class="message-bottom">
                <Likes v-for="item in decompteLikes"
                :toto="item.like"
                :tata="item.dislike"
                :MessageId="item.MessageId"
                :userDislikes="item.userDislikes"
                :userLikes="item.userLikes"
                :userConnected="userConnected"
                :key="item.id"
                />
                <BtnSup v-if= proprietaireMessage @click="supMessage()"/>
            </div>
            <Comments v-for="item in commentaires" 
            :content="item.content" 
            :UserId="item.UserId"
            :MessageId="item.MessageId"
            :key="item.id"
            :userCommentaire="item.User"
            />
            <AddComment :MessageId="id" :UserId="UserId" :userConnected="userConnected" />
        </div>
</template>


<script>
// @ is an alias to /src
// const axios = require('axios');
// let urlApi = "http://localhost:3000"



import Comments from '@/components/Comments.vue'
import Likes from '@/components/Likes.vue'
import AddComment from '@/components/AddComment.vue'
import BtnSup from '@/components/UI/Btn/BtnSup.vue'


import { mapState } from 'vuex';
import { mapActions } from 'vuex';

import Service from '@/services/service.js'


export default {
  name: 'Post',
  components: {
      Comments, Likes, AddComment, BtnSup
  },

      props: {

        id: {
            type: Number,
        },    
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        createdAt: {
            type: String,
        },
        attachment:{
            type: String,
        },
        // comments:{
        //     type: Array,
        // },
        // commentaires:{
        //     type:Array
        // },

        UserId: {
            type: Number,
        },

        user:{
            type: Object
        },

        // Decomptelikes:{
        //     type:Array
        // },
        
        userConnected:{ type: Object},
        
    },


  data() {
      
    return {
      commentaires: null,
      decompteLikes: null,
      proprietaireMessage:false
    }
  },


    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
        
        //     Trash(){
        //     if (this.userConnected.id === this.UserId){
        //         return this.proprietaireMessage = true
        //     } else {
        //         return this.proprietaireMessage
        //     }
            
        // },


        
    },

    watch:{
        // Trash(){
        //     if (this.userConnected.id === this.UserId){
        //         return this.proprietaireMessage = false
        //     } else {
        //         return this.proprietaireMessage = true
        //     }
        // },

        // proprietaireMessageTrue: function(){
        //     if (this.userConnected.id === this.UserId){
        //         return this.proprietaireMessage = false
        //     } else {
        //         return this.proprietaireMessage = true
        //     }
        // }
    },


   methods: {

       ...mapActions(['loadMessages']),


       supMessage() {
        Service.supMessage(this.id)
        .then (response => {
          console.log(response)
          window.location.href='/main'
        })
       }

    //    async loadComments() {
    //        let comments = await this.$store.dispatch('loadComments')
    //            .then(function (response) {
    //                console.log(response)
    //                return response;
    //            })
    //        return this.comments = comments;
    //    }
    //    async loadMessages() {
    //        let messages = await this.$store.dispatch('loadMessages')
    //            .then(function (response) {
    //                console.log(response)
    //                return response;
    //            })
    //        return this.messages = messages;
    //    },

    //    async loadComments(){
    //         let token = JSON.parse(localStorage.getItem('usertoken'))
    //             let messages = await axios.get(urlApi + '/api/message/3',{
    //                 headers: { 'Authorization': token }}
    //             )
    //            .then(function (response) {
    //                console.log(response.data.Comments)
    //                return response.data.Comments;
    //            })
    //         return this.commentaires = messages.Comments 
    //    }

    //        async loadComments(){
    //         let token = 'Bearer '+ JSON.parse(localStorage.getItem('usertoken'));
    //             let commentaires = await axios.get(urlApi + '/api/message/',{
    //                 headers: { 'Authorization': token }}
    //             )
    //            .then(function (response) {
    //                let allmessage = response.data
    //                 console.log("youpi")
    //                for(let i = 0; i<allmessage.length; i++){
    //                    console.log("un comment")
    //                    console.log(allmessage[i].Comments)
    //                    let Onemessage = allmessage[i].Comments
    //                    for(let i = 0; i<Onemessage.length; i++){ 
    //                         console.log(Onemessage[i])
    //                         if (allmessage[i].id === Onemessage[i].MessageId){
    //                             console.log("yes")
    //                             return this.commentaires = "caca"
    //                         }
    //                    }
    //                }                   
    //            })
    //         return this.commentaires = commentaires 
    //    }

    //     async loadComments(){
    //         let token = 'Bearer '+ JSON.parse(localStorage.getItem('usertoken'));
    //             let commentaires = await axios.get(urlApi + '/api/message/',{
    //                 headers: { 'Authorization': token }}
    //             )
    //            .then(function (response) {
    //                let allmessage = response.data
    //                 console.log("youpi")
    //                for(let i = 0; i<allmessage.length; i++){
    //                    console.log("un comment")
    //                    console.log(allmessage[i].Comments)
    //                    let Onemessage = allmessage[i].Comments
    //                    for(let i = 0; i<Onemessage.length; i++){ 
    //                         console.log(Onemessage[i])
    //                         if (allmessage[i].id === Onemessage[i].MessageId){
    //                             console.log("yes")
    //                             return this.commentaires = "caca"
    //                         }
    //                    }
    //                }                   
    //            })
    //         return this.commentaires = commentaires 
    //    }
   },



    created() {
           Service.getComments(this.id)
        .then (response => {
          this.commentaires = response.data
        })
        Service.getLike(this.id)
        .then (response => {
            this.decompteLikes = response.data
        })
        
        // if (this.userConnected.id === this.UserId){
        //         return this.proprietaireMessage = true
        //     } else {
        //         return this.proprietaireMessage
        //     }
    },

    beforeMount() {
		if (this.userConnected.id === this.UserId){
                return this.proprietaireMessage = true
            } else {
                return this.proprietaireMessage
            }
	},

}


</script>

<style lang="scss">@import "../sass/variables.scss";


    #message {
        width: 95%;
        margin: auto;
        background-color: $groupomania_bleu_clair;
        padding: 3%;
        margin-top: 5%;
        z-index: 0;

        .message-top {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 5%;
            position: relative;

            .positionPhoto {
                position: absolute;
                top: 0;
                width: 140%;
                text-align: left;
                margin-right: 5%;
                @include tablette {
                    width: 100%;
                }
                @include ecran {
                    width: 80%;
                }


                img {
                    width: 8%;
                    height: 46px;
                    margin-right: 1%;
                    position: absolute;
                    clip-path:ellipse(50% 50%);
                    // @include tablette{
                    //     margin-right: 5%;
                    // }
                    
                }
            }

            h1 {
                font-size: $textpetit;
                text-align: left;
                font-weight: 700;
                text-decoration: underline;
                margin-bottom: 0;
                margin-left: 13%;
                width: 80%;
                color: $groupomania_bleu;
                @include tablette{
                    margin-left: 10%;
                    font-size: 1rem;
                }
                @include ecran{
                    margin-left: 8%;
                    font-size: 1rem;
                }
            }

            p {
                text-align: right;
            }
        }

        .attachment-post {
            width: 100%;
            height: 80%;

            .image-post {
                width: 80%;
            }
        }

        .contenuComment {
            font-size: $textpetit;
            text-align: justify;
            margin-top: 2%;
            margin-bottom: 4%;
        }

        #title {
            font-size: $textpetit;
            text-align: center;
            font-weight: 700;
            margin-bottom: 0;
            color: $groupomania_bleu;
            @include tablette{
                font-size: 1rem;
            }
            @include ecran{
                font-size: 1rem;
            }
        }
        .message-bottom{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }

    @include tablette_ecran {


        #message {
            width: 80%;
            margin: auto;
            margin-top: 5%;
            padding: 4%;
            .message-top{ 
                img {
                width: 7%;
                }
            }
            .attachment-post{
                width: 100%;
                height: 80%;
                .image-post{
                    width: 80%;
                }
            }
            
        }
      
        .button-user {
            background-color: $groupomania_bleu_clair;
            width: 5%;
            margin: 0;

            @include tablette_ecran {
                background-color: none;
            }

            .destroy-icon {
                background-color: $groupomania_bleu;
                width: 85%;
                height: 30px;

            }
        }
    }


</style>