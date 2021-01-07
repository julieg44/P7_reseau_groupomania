<template>
    <div class="ligne-comment">
        <div class="positionPhoto">
            <img :src="userCommentaire.photo" />
        </div>
        <h1 class="username"> {{ userCommentaire.username }}</h1>
        <p> {{ content }}</p>
    </div>
</template>


<script>
// @ is an alias to /src




export default {
  name: 'Comments',
  components: {

  },

    props: {
        
    content: {
        type: String,
        },


    // UserPhoto:{
    //     type: String
    // },
    // UserUsername:{
    //     type: String
    // },

    // user:{
    //     type:Object
    // },

    userCommentaire:{
        type:Object
    }



      
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


.ligne-comment {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10%;
    margin-top: 4%;

    @include tablette_ecran {
        margin-bottom: 5%;
    }

    .positionPhoto {
        text-align: left;
        margin-right: 1%;

        img {
            width: 7%;
            margin-right: 1%;

            @include tablette_ecran {
                width: 29px;
                height: 29px;
                clip-path: ellipse(50% 50%);
            }
        }
    }


    .username {
        font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-top: 1%;
        margin-bottom: 0;
        margin-right: 1%;

        @include tablette_ecran {
            font-size: 0.7rem;
            text-align: left;
            font-weight: 700;
            margin-right: 1%;
        }
    }

    p {
        text-align: left;
        font-size: 0.7rem;
        margin-top: 1%;
    }
}

</style>