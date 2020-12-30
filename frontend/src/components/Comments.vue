<template>
    <div id="comments">
        <div class="positionPhoto">
            <img :src="userCommentaire.photo" />
            <img class="cacheBleu" src="../assets/avatar-cache-bleu.png" />
        </div>
        <h1> {{ userCommentaire.username }}</h1>
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


#comments {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // align-items: center;
    margin-bottom: 10%;    
    margin-top: 4%;
    @include tablette_ecran{
        margin-bottom: 5%;
    }

    .positionPhoto{ 
    // position: absolute;
    // bottom: 7%;
    // width: 5%;
    text-align: left;
    margin-right: 5%;
    @include tablette_ecran {
        position: absolute;
        // bottom: 7%;
        width: 40%;
        text-align: left;
    }


    img {
        width: 7%;
        margin-right:1%;
        position: absolute;
        @include tablette_ecran{
                
        width: 29px;
        margin-right:1%;
        position: absolute;
        
        }
    }
    }
    

    h1 {
        font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-top: 1%;
        margin-bottom: 0;
        margin-right: 3%;
        margin-left: 5%;
        @include tablette_ecran{
            font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-bottom: 0;
        margin-right: 3%;
        margin-left: 6%;
        }
    }

    p {
        text-align: left;
        font-size: 0.7rem;
        margin-top: 1%;
    }

}



</style>