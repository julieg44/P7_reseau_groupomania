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
            <Comments v-for="item in comments" 
            :content="item.content" 
            :key="item.id"/>
            <AddComment/>

        </div>
</template>


<script>
// @ is an alias to /src


import Comments from '@/components/Comments.vue'
import Likes from '@/components/Likes.vue'
import AddComment from '@/components/AddComment.vue'

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
    },

  data() {
    return {
    //   comments: null,
      comments: null
    }
  },


  computed: {
 
  },


   methods: {

       ...mapActions(['loadComments']),

       async loadComments() {
           let comments = await this.$store.dispatch('loadComments')
               .then(function (response) {
                   console.log(response)
                   return response;
               })
           return this.comments = comments;
       },
    },
   

    created() {
        this.loadComments()
        console.log(this.comments)
    },
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