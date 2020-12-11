<template>
    <div id="AddComments">
        <img src="../assets/avatar.png" />
        <input type='text' placeholder="blablabla"/>
        <BtnAddComment @click="PostComment()"/>

    </div>
</template>


<script>
// @ is an alias to /src


import BtnAddComment from '@/components/BtnAddComment.vue'


export default {
  name: 'AddComment',
  components: {
      BtnAddComment
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


#AddComments {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2%;    
    margin-top: 2%;
    padding: 1%;
    background-color: $blanc;


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

    input {
        text-align: left;
        font-size: 0.7rem;
        border: none;
        width: 87%;
    }

    @include tablette_ecran {
        
        img {
        width: 4%;
        }
        
    }
}


</style>