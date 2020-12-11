<template>
    <div class="bienvenue">
        <h1>Bonjour {{ user.username }} !</h1>
        <div class="iconPerso">
            <div class="notification"></div>
            <div class="search"></div>
        </div>
        <div class="post-icon">
            <a href="#cartouchePost" id="openPost">
                <img src="../assets/comment.svg" />
            </a>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import { mapActions } from 'vuex';



export default {
  name: 'EncartBienvennue',
  components: {

  },
  data(){
      return {
          user : null
      }
  },

  computed: {
    ...mapState ({
    users: "users",
    selectedUser: "selectedUser",
    token: "token",
    }),  
  },


   methods: {
   ...mapActions (['supUser', 'deconnect', 'modifyUser']),

   async loadProfil() {
    let user = await this.$store.dispatch('loadUser', { id:this.$route.params.id })
        .then (function (response){
            return response;
        })
    return this.user = user;    
   }
  },

    created(){
    console.log('trop tot')
        this.loadProfil() 
  },



}
</script>

<style lang="scss">

@import "../sass/main.scss";




.bienvenue {
    display: flex;
    justify-content: flex-start;
    margin-top: 5%;

    h1 {
        color: $groupomania_rouge;
        text-align: left;
        font-size: $textmoyen;
        font-weight: 700;
        margin-right: 15%;
        width: 85%;
        margin-bottom: 0;
    }

    .iconPerso {
        display: none;
    }

    .post-icon {
        width: 10%;
        margin-right: 5%;
    }

    @include tablette_ecran {

        display: flex;
        justify-content: flex-start;
        margin-top: 5%;
        h1{
        margin-bottom: 5%;
        }

        .iconPerso {
            width: 15%;
            display: flex;
            justify-content: space-between;
            margin-right: 3%;

            .notification {
                width: 25%;
                background-color: $groupomania_rouge;
                -webkit-mask: url(../assets/bell.svg);
                mask: url(../assets/bell.svg);
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: 100%;
            }

            .search {
                width: 28%;
                background-color: $groupomania_rouge;
                -webkit-mask: url(../assets/search.svg);
                mask: url(../assets/search.svg);
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: 100%;
            }
        }


        .post-icon {
            display: none;
        }
        
    }
}

    

</style>