<template>
    <div id="cartouchePost">
        <p>De quoi souhaitez vous parler aujourd'hui ?</p>
        <div id="post">
            <form id="post-form" enctype="multipart/form-data">
                <div class="closePost"><a href="#" id="closePost">X</a></div>
                <input id="titrepost" placeholder="Titre" type="text" v-model="title">
                <input id="contentpost" placeholder="écrivez-ici" type="text" v-model="content">
                <div class="align-boutons">
                    <input id="fichier" type="file" @change="onFileSelected"/>
                    <!-- <BtnAddMedia /> -->
                    <BtnRouge @click.prevent="poster()" label="Envoyer" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
// import BtnBlanc from '@/components/UI/Btn/BtnBlanc.vue'
import { mapState } from "vuex";
import { mapActions } from 'vuex';

const axios = require('axios');
let urlApi = "http://localhost:3000";


export default {
  name: 'EncartPost',
  components: {
    BtnRouge, 
    // BtnBlanc,
  },
  data(){
      return {
          user : null, content:"", title:"", UserId:41, selectedFile:null
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

   onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },

    poster() {
        let fd = new FormData()
        // fd.append('image', this.selectedFile, this.selectedFile.name)

        fd.append('UserId', this.user.id)
        fd.append('title', this.title)
        fd.append('content', this.content)
        fd.append('nbLikes', 0)
        fd.append('nbDislikes', 0)
        axios.post(urlApi + '/api/message', fd)
            .then(function (response) {
                console.log(response)
            })
    },

            async loadProfil() {
            let user = await this.$store.dispatch('loadUser', {
                    id: this.$route.params.id
                })
                .then(function (response) {
                    return response;
                })
            return this.user = user;
        }
    },

    created() {
        this.loadProfil()
        console.log(this.user)
    },

  }


</script>

<style lang="scss">

@import "../sass/main.scss";


#cartouchePost {
    padding: 2%;
    @include tablette_ecran {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 0;
        padding: 0;
    }

    p {
        color: $gris3;
        font-size: 1rem;
        font-weight: 300;
        text-align: left;
        margin-top: 3%;

        @include tablette_ecran {
            margin-top: 0;
        }
    }

    #post {
        background-color: $gris1;
        margin-top: 2%;
        padding: 4% 4% 4% 4%;
        text-align: right;

        @include tablette_ecran {
            background-color: $blanc;
            height: 250px;
            padding: 2% 2% 2% 2%;
        }
    }

    #post-form {
        width: 100%;
        @include tablette_ecran{
            height: 150px;
        }

        input {
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;

            @include tablette_ecran {
                background-color: $blanc;
                text-align: left;
                margin-top: 0;
            }
        }

        #contentpost {
            height: 95px;

            @include tablette_ecran {
                height: 150px;
            }
        }

        #titrepost {
            height: 30px;

            @include tablette_ecran {
                height: 40px;
            }
        }

    }

    .align-boutons {
        display: flex;
        justify-content: flex-end;

        #fichier {
            width: 40%;
        }
    }
}

</style>