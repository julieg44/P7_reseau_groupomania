<template>
    <div id="comments">
        <img src="../assets/avatar.png" />
        <h1> Jean Michel</h1>
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
    id:{
        type: Number,
    }, 
       
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
    align-items: center;
    margin-bottom: 2%;    
    margin-top: 2%;


    img {
        width: 7%;
        margin-right:1%;
    }

    h1 {
        font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-bottom: 0;
        margin-right: 3%;
    }

    p {
        text-align: left;
        font-size: 0.7rem;
    }

    @include tablette_ecran {
        
        img {
        width: 4%;
        }
        
    }
}


</style>