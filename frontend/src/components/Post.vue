<template>
    <section id="filPost">
        <div id="message">
            <div id="message-top">
                <img src="../assets/avatar.png"/>
                <h1> Jean Michel</h1>
                <p> date</p>  
            </div> 
            <img src=""/>
            <p class="contenuComment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus ultricies volutpat. Vivamus eu vestibulum leo, quis aliquet velit. Pellentesque eleifend hendrerit dui et commodo. Etiam feugiat nibh at tellus placerat, vel laoreet dui posuere. Donec molestie vitae quam ac tincidunt.</p> 
            <Likes/>
            <Comments/>
            <Comments/>
            <AddComment/>

        </div>
    </section>
</template>


<script>
// @ is an alias to /src


import Comments from '@/components/Comments.vue'
import Likes from '@/components/Likes.vue'
import AddComment from '@/components/AddComment.vue'



export default {
  name: 'Post',
  components: {
      Comments, Likes, AddComment
  },


  computed: {
 
  },


   methods: {

  },

    created(){

  },
}


</script>

<style lang="scss">@import "../sass/main.scss";

#filPost {
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
    }

    @include tablette_ecran {
        max-width: 980px;
        margin: auto;

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
}

</style>