<template>
        <div id="message">
            <div id="message-top">
                <img src="../assets/avatar.png"/>
                <h1> {{ title }}</h1>
                <p> {{ createdAt }}</p>  
            </div> 
            <h2 id="title">{{ title }}</h2>
            <img v-if="attachment" :src="attachment"/>
            <p class="contenuComment">{{ content }}</p> 
            <Likes/>
            <Comments v-for="item in toto" 
            :toto="item.content" 
            :key="item.id"/>
            <AddComment/>

        </div>
</template>


<script>
// @ is an alias to /src
// const axios = require('axios');
// let urlApi = "http://localhost:3000"



import Comments from '@/components/Comments.vue'
import Likes from '@/components/Likes.vue'
import AddComment from '@/components/AddComment.vue'

import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Post',
  components: {
      Comments, Likes, AddComment
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
        toto:{
            type: Array,
        }
    },

//   data() {
//     return {
//       comments: null
//     }
//   },
//   data() {
      
//     return {
//       messages: null, 
//       commentaires: null,
//     }
//   },


    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
    },


   methods: {

       ...mapActions(['loadMessages']),

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



    // created() {
    //     this.loadMessages()
    //     this.loadComments()
    // },

}


</script>

<style lang="scss">@import "../sass/main.scss";


    #message {
        width: 95%;
        margin: auto;
        background-color: $groupomania_bleu_clair;
        padding: 3%;
        margin-top: 5%;

        #message-top {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 5%;

            img {
                width: 15%;
                margin-right: 3%;
            }

            h1 {
                font-size: $textpetit;
                text-align: left;
                font-weight: 700;
                margin-bottom: 0;
                width: 80%;
                color: $groupomania_bleu;
            }

            p {
                text-align: right;
            }
        }

        .contenuComment {
            font-size: $textpetit;
            text-align: justify;
            margin-top: 2%;
            margin-bottom: 4%;
        }
        #title{
            font-size: $textpetit;
            text-align: center;
            font-weight: 700;
            margin-bottom: 0;
            color: $groupomania_bleu;
        }
    }

    @include tablette_ecran {


        #message {
            width: 80%;
            margin: auto;
            margin-top: 5%;
            padding: 4%;
            #message-top{
                img {
                width: 7%;
                }
            }
        }
    }


</style>