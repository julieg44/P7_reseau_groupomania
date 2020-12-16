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
                    <BtnPost @click="poster()"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import BtnPost from '@/components/BtnPost.vue'
// import BtnAddMedia from '@/components/BtnAddMedia.vue'
import { mapState } from "vuex";
import { mapActions } from 'vuex';

const axios = require('axios');
let urlApi = "http://localhost:3000";


export default {
  name: 'EncartPost',
  components: {
    BtnPost, 
    // BtnAddMedia,
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
        fd.append('image', this.selectedFile, this.selectedFile.name)

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
    p {
        color: $gris3;
        font-size: 1rem;
        font-weight: 300;
        text-align: left;
        margin-top: 3%;
    }

    #post {
        background-color: $gris1;
        margin-top: 2%;
        padding: 4% 4% 4% 4%;
        text-align: right;
    }
    #post-form{
        width: 100%;
        input {
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;
        }
        #contentpost{
            height: 95px;
        }
        #titrepost{
            height:30px;
        }

    }
    .align-boutons{
    display: flex;
    justify-content: flex-end;
        #fichier{
            width: 40%;
        }
    }




    @include tablette_ecran {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 0;

        p {
            margin-top: 0;
        }

        .post-icon {
            display: none;
        }

        #post {
            background-color: $blanc;
            margin-top: 2%;
            height: 250px;
            padding: 2% 2% 2% 2%;
            text-align: right;
        }
        #titrepost{
            height:40px;
        }

        input {
            border: none;
            color: $gris3;
            width: 100%;
        }
        #contentpost{
            height: 40%;
        }
    }
}

</style>