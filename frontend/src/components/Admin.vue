<template>
    <div id="contentAdmin">
        <div id="blocUtilisateurs">
            <h2 class="titleAdmin">Liste des utilisateurs</h2>
            <div class="listeEntete">
                <div class="case"><p>Nom</p></div> 
                <div class="case"><p>Email</p></div> 
                <div class="case date"><p>Date de création</p></div>
            </div>
            <User v-for="item in listeUser"
            :username="item.username"
            :creation="item.createdAt"
            :email="item.email"
            :idUser="item.id"
            :key="item.id"/>
        </div>
        <div id="blocMessages">
            <h2 class="titleAdmin">Liste des messages</h2>
            <div class="listeEntete">
                <div class="case"><p>Nom</p></div> 
                <div class="case"><p>Contenu</p></div> 
                <div class="case date"><p>Date de création</p></div>
            </div>
            <Messages v-for="item in messages"
            :content="item.content"
            :creation="item.createdAt"
            :userUsername="item.User.username"
            :idMessage="item.id"
            :commentaire="item.Comments"
            :key="item.id"/>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src

import Service from '@/services/service.js'
import User from '@/components/UserAdmin.vue'
import Messages from '@/components/MessagesAdmin.vue'





export default {
  name: 'Admin',
  components: {
        User, Messages
  },


    props: {
     messages:{
         type:Array
     }
    },

data(){
    return{
        listeUser:null
    }
},



  computed: {
 
  },


   methods: {

  },

    created(){
        Service.getAllUsers()
        .then (response => {
            this.listeUser = response.data
        })
  },
}


</script>

<style lang="scss">@import "../sass/main.scss";


#contentAdmin {
    
  position: relative;
  max-width: 90%;
    margin: auto;

  @include tablette{
    max-width: 90%;
    margin: auto;
  }
  @include ecran{
    max-width: 980px;
    margin: auto;
  } 
  .titleAdmin{
      margin-bottom: 3%;
  }  
  #blocUtilisateurs{
      margin-top: 5%;
      margin-bottom: 10%;
}

      .listeEntete{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1%;
        text-align: left;
        background-color: $groupomania_rouge;
        color: $blanc;
        font-weight: 700;
        .case{
        width: 45%;
        font-size: 0.7rem;
        text-align: left;
        @include tablette_ecran{
            font-size: 1rem;
            width: 25%;
        }
    }
  }


        .suppression{
        color: $groupomania_rouge;
        text-decoration: underline;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
        width: 10%;
        text-align: right;
        @include tablette_ecran{
            width: 25%;
        }
            p{
                display: none;
                @include tablette_ecran{
                    display: block;
                }
            }
            .trashIcon{
                width: 10%;
                img{
                    width: 40%;
                }
                @include tablette_ecran{
                    display: none;
                }
            }
    }
    .date{
        display: none;
        @include tablette_ecran{
            display: block;
        }
    }
}

</style>