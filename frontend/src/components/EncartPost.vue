<template>
    <div id="cartouchePost">
        <p>De quoi souhaitez vous parler aujourd'hui ?</p>
        <div class="post">
            <form class="post-form" enctype="multipart/form-data">
                <div class="closePost"><a href="#" id="closePost"><img src="../assets/close.svg"/></a></div>
                <input class="titrepost" placeholder="Titre" type="text" v-model="title">
                <input class="contentpost" placeholder="écrivez-ici" type="text" v-model="content">
                <div class="align-boutons">
                    <input class="inputPost" type="file" @change="onFileSelected"/>
                    <BtnRouge @click.prevent="poster()" label="Envoyer"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
// import { mapState } from "vuex";
// import { mapActions } from 'vuex';
// import Service from '@/services/service.js'


const axios = require('axios');
let urlApi = "http://localhost:3000";


export default {
  name: 'EncartPost',
  components: {
    BtnRouge, 
    // BtnAddMedia,
  },

  props: {
        userConnected:{ type:Object}
    },

  data(){
      return {
          content:"", title:"", selectedFile:null
      }
  },

//   computed: {
//     ...mapState ({
//     users: "users",
//     selectedUser: "selectedUser",
//     token: "token",
//     }),  
//   },


   methods: {
//    ...mapActions (['supUser', 'deconnect', 'modifyUser']),

   onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },

    // poster() {
    //     let fd = new FormData()
    //     if(this.selectedFile !== null){
    //         fd.append('image', this.selectedFile, this.selectedFile.name)
    //         }
    //     // if(this.user.photo !== null){
    //     //     fd.append('UserPhoto', this.user.photo)
    //     // }    
    //     fd.append('UserId', this.userConnected.id)
    //     fd.append('title', this.title)
    //     fd.append('content', this.content)
    //     fd.append('nbLikes', 0)
    //     fd.append('nbDislikes', 0)
    //     axios.post(urlApi + '/api/message', fd)
    //         .then(function (response) {
    //         console.log(response.data)
    //         debugger;
    //         let LikeDefault = {
    //            UserId: this.userConnected.id,
    //            MessageId: response.data.id,               
    //            like: 0,               
    //            dislike: 0
    //         }
    //         debugger;
    //         console.log(LikeDefault)
    //         axios.post(urlApi + '/api/like/message/' + response.data.id, LikeDefault)
    //            .then(function (response) {
    //                debugger;
    //                console.log(response)
    //            })
    //        })     
    // },

        async poster() {
            if (this.selectedFile !== null) {
                let fd = new FormData()
                fd.append('image', this.selectedFile, this.selectedFile.name)
                fd.append('UserId', this.userConnected.id)
                fd.append('title', this.title)
                fd.append('content', this.content)
                fd.append('nbLikes', 0)
                fd.append('nbDislikes', 0)
                await axios.post(urlApi + '/api/message', fd)
                    .then(function (response) {
                        console.log(response.data.data)
                        let LikeDefault = {
                            UserId: response.data.data.UserId,
                            MessageId: response.data.data.id,
                            like: 0,
                            // dislike: 0,
                            // userLikes:{"id":[]},
                            // userDislikes:{"id":[]}
                        }
                        console.log(LikeDefault)
                        axios.post(urlApi + '/api/like/message/' + response.data.data.id, LikeDefault)
                            .then(function (response) {
                                console.log(response)
                            })

                        window.location.href = '/main'
                    })
            } else {
                let Newmess = {
                    UserId: this.userConnected.id,
                    title: this.title,
                    content: this.content,
                    // nbLikes: 0,
                    // nbDislikes: 0
                }
                console.log(Newmess)
                await axios.post(urlApi + '/api/message', Newmess)
                    .then(function (response) {
                        console.log(response.data.data.id)
                        let LikeDefault = {
                            UserId: response.data.data.UserId,
                            MessageId: response.data.data.id,
                            like: 0,
                            // dislike: 0,
                            // userLikes:{"id":[]},
                            // userDislikes:{"id":[]}
                        }
                        console.log(LikeDefault)
                        axios.post(urlApi + '/api/like/message/' + response.data.data.id, LikeDefault)
                            .then(function (response) {
                                console.log(response)
                            })
                        window.location.href = '/main'
                    })
            }

        },



// poster(){
//     let LikeDefault = {
//         UserId: this.userConnected.id,
//         MessageId: 11,
//         like: 30,
//         dislike: 0
//         }
//         console.log(LikeDefault)
//         axios.post(urlApi + '/api/like/user/message/' + 11, LikeDefault)
//             .then(function (response) {
//                 console.log(response)
//             })
// }






        },


    //         poster() {
    //     let fd = new FormData()
    //     if(this.selectedFile !== null){
    //         fd.append('image', this.selectedFile, this.selectedFile.name)
    //         }   
    //     fd.append('UserId', this.userConnected.id)
    //     fd.append('title', this.title)
    //     fd.append('content', this.content)
    //     fd.append('nbLikes', 0)
    //     fd.append('nbDislikes', 0)
    //     axios.post(urlApi + '/api/message', fd)
    //         .then(function (response) {
    //         console.log(response.data.data)
    //         window.location.href = '/main'
    //        })     
    // },

        //     async loadProfil() {
        //     let user = await this.$store.dispatch('loadUser', {
        //             id: this.$route.params.id
        //         })
        //         .then(function (response) {
        //             return response;
        //         })
        //     return this.user = user;
        // }
    

    created() {
        // this.loadProfil()
        // console.log(this.user)
    },

  }


</script>

<style lang="scss">

@import "../sass/main.scss";


#cartouchePost {
    padding: 2%;
    background-color: $blanc;

    @include tablette_ecran {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 0;
        padding: 0;
        background-color: $gris1;
    }

    p {
        color: $gris3;
        font-size: 1.3rem;
        font-weight: 300;
        text-align: left;
        margin-top: 3%;

        @include tablette_ecran {
            margin-top: 0;
            font-size: 1rem;
        }
    }

    .post {
        background-color: $gris1;
        margin-top: 2%;
        padding: 4% 4% 4% 4%;
        text-align: center;

        @include tablette_ecran {
            background-color: $blanc;
            height: 180px;
            padding: 2% 2% 2% 2%;
            text-align: right;
        }
    }

    .post-form {
        width: 100%;

        @include tablette_ecran {
            height: 150px;
        }

        .closePost{
                    width: 5%;
                    margin-left: 95%;

        }
        // @include tablette_ecran{
        //     display: none;
        // }

        // input {
        //     border: none;
        //     color: $gris3;
        //     width: 100%;
        //     margin-top: 3%;

        //     @include tablette_ecran {
        //         background-color: $blanc;
        //         text-align: left;
        //         margin-top: 0;
        //     }
        // }

        .contentpost {
            height: 95px;
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;
            margin-bottom: 3%;

            @include tablette_ecran {
                height: 80px;
                background-color: $blanc;
                text-align: left;
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        .titrepost {
            height: 30px;
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;

            @include tablette_ecran {
                height: 40px;
                background-color: $blanc;
                text-align: left;
                margin-top: 0;
            }
        }
    }

    .align-boutons {
        @include tablette_ecran{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        }  
    }
}

</style>