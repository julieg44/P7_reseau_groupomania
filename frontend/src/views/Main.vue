<template>
  <div id="global">
    <Entete />
    <Nav :userConnected="userConnected" :admin="admin" @affichageUser="showUserOpen()" @input="input()"/>
    <!-- champs de recherche d'un utilisateur -->
    <div class="search-input" v-show="showInput">
        <input class="input-search" type="text" placeholder="Rechercher un nom" v-model="searchName" />
        <BtnRouge class="search-btn" @click="search()" label="Chercher" />
        <div class="closeSearch" @click="closeInput()"><img src="../assets/close.svg"/></div>
    </div>

    <!-- Première partie utilisateur -->
    <div id="section-user" v-show="showUser">
      <div id='content-user'>
        <EncartProfil :userConnected="userConnected" />
        <div id="content-post">
          <div id="content-bienvenue">
            <div class="message-accueil" v-if="userConnected">
              <h1>Bonjour {{ userConnected.username }} !</h1>
            </div>
            <div class="iconPerso">
              <div class="closeUser" @click="showUserClose()"></div> 
            </div>
          </div>
          <EncartPost :userConnected="userConnected"/>
        </div>
      </div>
    </div>


    <!--Seconde partie messages -->
    <div id="section-post" v-if="admin===false">
        <div class="filPost" v-if="messagesUser">
          <Post v-for="item in messagesUser"
          :id="item.id" 
          :title="item.title" 
          :createdAt="item.createdAt" 
          :content="item.content"
          :attachment="item.attachment"
          :user="item.User"
          :UserId="item.UserId"
          :Commentaires="item.Comments"
          :key="item.id" 
          :userConnected="userConnected"
          :admin="admin"
          />
        </div>

        <div class="filPost" v-else>
          <Post v-for="item in messages"
          :id="item.id" 
          :title="item.title" 
          :createdAt="item.createdAt" 
          :content="item.content"
          :attachment="item.attachment"
          :user="item.User"
          :Commentaires="item.Comments"
          :UserId="item.UserId"
          :key="item.id" 
          :userConnected="userConnected"
          :admin="admin"
          />
        </div>

        <!--Si l'utilisateur recherché n'a pas posté -->
        <div id="noPost" v-if="noMessage">
          <h3>Cet utilisateur n'a pas posté de messages</h3>
          <div class="closeSearch" @click="closeInput()"><img src="../assets/close.svg"/></div>
        </div>
    </div>

  <!-- si utilisateur connecté est admin -->
  <div id="administrateur" v-else>
    <Admin :messages="messages"/>
  </div>


  </div>
</template>

<script>
// @ is an alias to /src
import Entete from '@/components/Entete.vue'
import Nav from '@/components/Nav.vue'
import EncartProfil from '@/components/EncartProfil.vue'
import Admin from '@/components/Admin.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import EncartPost from '@/components/EncartPost.vue'
import Post from '@/components/Post.vue'
import Service from '@/services/service.js'



export default {
  name: 'Main',

  components: {
    Entete,
    Nav,
    EncartProfil,
    EncartPost,
    Post,
    Admin,
    BtnRouge
  },

  data() {
    return {
      messages: null,
      userConnected: null,
      messagesUser: null,
      showInput: false,
      searchName: "",
      showUser: false,
      showIcon: true,
      admin: false,
      noMessage: false
    }
  },



  methods: {

    input() {
      this.showInput = true
      this.showIcon = false
    },

    closeInput() {
      this.showInput = false
      Service.getMessages()
        .then(response => {
          this.messages = response.data
          this.messagesUser = null
          this.showIcon = true
        })
    },

    showUserOpen() {
      this.showUser = true
    },

    showUserClose() {
      this.showUser = false
    },

    async search() {
      await Service.getUserFiltre(this.searchName)
        .then(response => {
          let idRecherche = response.data.id
          Service.getMessagesOneUser(idRecherche)
            .then(response2 => {
              if (response2.data.length === 0) {
                return this.noMessage = true, this.messages = null
              } else {
                return this.messagesUser = response2.data, this.messages = null
              }
            })
        })
    }
  },

  created() {
    let selectedUser = localStorage.getItem('userId')
    Service.getUser(selectedUser)
      .then(response => {
        this.userConnected = response.data
        if (response.data.isAdmin === true) {
          this.admin = true
        }
      })

    Service.getMessages()
      .then(response => {
        this.messages = response.data
      })
  },
}

</script>

     


<style lang="scss">

@import "../sass/main.scss";



#section-user {
  z-index: 10;
  position: fixed;
  width: 100%;
  padding-top: 1%;
  padding-bottom: 2%;
  top: 115px;

  @include tablette {
    background-color: $gris1;
    top: 119px;
  }
  @include ecran{
    background-color: $gris1;
    top: 119px;
  }
}
.search-input {
  display: flex;
  flex-direction: row;
  width: 95%;
  padding: 3%;
  margin: auto;
  background-color: $gris1;
  align-items: center;
  margin-top: 40%;
  margin-bottom: -30%;

  @include tablette{
  width: 60%;
  margin-top: 18%;
  margin-bottom: -14%;
  }
  @include ecran{
      width: 60%;
  max-width: 480px;
  margin-top: 8%;
  margin-bottom: -7%;
  padding: 1%;
  }

  .input-search {
    height: 30px;
    width: 70%;
    border: none;
  }

  .search-btn {
    width: 40%;
    height: 30px;
    margin-right: 2%;
  }

  .closeSearch {
    width: 20px;
    height: 20px;
    background-color: $groupomania-rouge;

    img {
      width: 40%;
      margin-top: 30%;
    }
  }
}

#content-user {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: relative;

  @include tablette{
    padding-left: 3%;
    padding-right: 3%;
  }

  @include tablette_ecran {
    display: flex;
    flex-direction: row;
    max-width: 980px;
    margin: auto;
    align-items: initial;
  }
}

.closeUser {
  display: none;

  @include tablette_ecran {
    display: block;
    width: 18%;
    height: 25px;

    background-color: $groupomania-rouge;
    -webkit-mask: url(../assets/close.svg);
    mask: url(../assets/close.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
  }
}

#content-post {
  position: absolute;
  width: 100%;

  @include tablette_ecran {
    position: relative;
    flex-direction: column;
    margin: auto;
    align-items: initial;
    display: flex;
    width: 75%;
    background-color: $gris1;
  }

  #content-bienvenue {
    display: none;

    @include tablette_ecran {
      display: flex;
      flex-direction: row;
      align-items: center;

      .iconPerso {
        width: 15%;
        display: flex;
        justify-content: flex-end;
        margin-right: 3%;
        margin-top: 3%;
      }

      .message-accueil {
        display: flex;
        justify-content: flex-start;
        margin-top: 3%;
        padding: 0;
        width: 80%;

        h1 {
          color: $groupomania_rouge;
          text-align: left;
          font-size: $textmoyen;
          font-weight: 700;
          margin-right: 15%;
          width: 85%;
          margin-bottom: 2%;
        }
      }
    }
  }
}


////// LES POST /////


#section-post {
  z-index: 0;
  width: 100%;
  margin-top: 40%;

  @include tablette {
    margin-top: 20%;
  }

  @include ecran {
    margin-top: 10%;
  }

  #noPost {
    margin-top: 20%;

    h3 {
      color: $groupomania_bleu;
      font-size: 1.5rem;
    }

    .closeSearch {
      width: 20px;
      height: 20px;
      margin: auto;
      margin-top: 2%;
      background-color: $groupomania-rouge;

      img {
        width: 40%;
        margin-top: 30%;
      }
    }
  }
}



.filPost {
  position: relative;
  width: 100%;
  z-index: 0;

  @include tablette_ecran{
    max-width: 980px;
    margin: auto;
  }
  @include ecran{
    max-width: 980px;
    margin: auto;
  } 
}


#administrateur{
  
    z-index: 0;
    width: 100%;
    margin-top: 40%;
    @include tablette{
      margin-top: 20%;
    }
    @include ecran{
      margin-top: 10%;
    }
}

</style>