<template>
    <div id="cartoucheProfil" v-if="userConnected">
        <div class="photo">
            <div class="taille-photo">
                <img id="principale" v-if="userConnected.photo !==null" :src="userConnected.photo" alt="photo de profil" />
                <img id="principale"  v-else src="../assets/avatar.png" alt="photo de profil" />

            </div>
        </div>
        <div class="closeProfil"><a href="#" id="closeProfil"><img src="../assets/close.svg"/></a></div>
        <h2 class="profilName"> {{userConnected.username}}</h2>
        <p class="contenuProfil">Email :{{ userConnected.email }}</p>
        <div class="actionProfil">
            <BtnDeconnect @click="deconnect()" />
            <router-link :to="_modify">
                <BtnModifyUser />
            </router-link>
            <BtnSup @click="supUser(userConnected.id)" />
        </div>
    </div>
</template>

<script>
// const axios = require('axios');
// let urlApi = "http://localhost:3000"

// @ is an alias to /src
import BtnSup from '@/components/UI/Btn/BtnSup.vue'
import BtnDeconnect from '@/components/UI/Btn/BtnDeconnect.vue'
import BtnModifyUser from '@/components/UI/Btn/BtnModifyUser.vue'
import Service from '@/services/service.js'

import { mapState } from "vuex";
import { mapActions } from 'vuex';




export default {
    name: 'EncartProfil',
    components: {
        BtnSup,
        BtnDeconnect,
        BtnModifyUser
    },

    props: {

        userConnected:{ type:Object}
    },

    // data() {
    //     return {
    //         user: null
    //     }
    // },

    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
        _modify() {
            return '/modifyUser';
        }
    },


    methods: {
        ...mapActions(['supUser', 'deconnect']),

        // async loadProfil() {
        //         let user = await this.$store.dispatch('loadUser', {
        //                 id: this.$route.params.id
        //             })
        //             .then(function (response) {
        //                 return response;
        //             })
        //         return this.user = user;
        //     },






        deconnect() {
            localStorage.clear()
            window.location.href = '/';
        },
        supUser() {
            //@todo  => alert sure ??
            // let token = 'Bearer ' + JSON.parse(localStorage.getItem('usertoken'));
            // axios.delete(urlApi + '/api/user/' + this.userConnected.id, {
            //         headers: {
            //             'Authorization': token
            //         }
            //     })
        Service.supUser(this.userConnected.id)
                .then(function () {
                    window.location.href = '/'
                })
        },
    },

    created() {
        // this.loadProfil()
        // console.log(this.user)
        
    },



}
</script>

<style lang="scss">

@import "../sass/variables.scss";
@import "../sass/button.scss";
@import "../sass/animMobile.scss";




#cartoucheProfil {
    width: 95%;
    background-color: $groupomania_rouge_clair;
    padding-bottom: 7%;

    @include tablette{
    width: 25%;
    }

    @include ecran{
    width: 20%;
    }

    @include tablette_ecran {
        margin-right: 2%;
        background-color: $blanc;
        position: relative;
        padding-bottom: 0;
    }

    .closeProfil {
        position: absolute;
        bottom: 83%;
        right: 32px;
        width: 5%;
    }

    h2 {
        font-size: 1.7rem;
        font-weight: 300;
        color: $groupomania_rouge;
        text-align: left;
        text-transform: uppercase;
        margin-bottom: 5%;
        margin-left: 5%;

        @include tablette_ecran {
            font-size: 1.3rem;
            margin-top: 30%;
            margin-bottom: 3%;
            text-align: center;
        }
    }

    p {
        font-size: 1.3rem;
        color: $gris3;
        text-align: left;
        margin-left: 5%;
        line-height: 1.7rem;
        @include tablette_ecran{
          font-size: 0.8rem;  
        }
    }

    .photo {
        background-color: $groupomania_rouge;
        text-align: left;
        height: 84px;
        margin-bottom: 25%;
        position: relative;

        @include tablette_ecran {
            height: 34%;
        }

        .taille-photo {
            @include tablette{
                width: 55%;
                margin: auto;
            }
            @include ecran {
                width: 60%;
                margin: auto;
            }
        }

        img {
            width: 140px;
            height: 140px;
            margin: 5%;
            position: absolute;
            clip-path: ellipse(50% 50%);
            @include tablette{
                width: 56%;
                margin: 0;
                margin-top: 10%;
                height: 100px;
            }
            @include ecran{
                width: 60%;
                margin: 0;
                margin-top: 10%;
                height: 120px;
            }
        }
    }

    .actionProfil {
        width: 80%;
        height: 55px;
        position: absolute;
        bottom: 45%;
        right: 10px;
        text-align: right;

        @include tablette_ecran {
            width: 100%;
            height: 40px;
            position: absolute;
            bottom: 0px;
            text-align: center;
        }
    }

    .button-user {
        background-color: $groupomania_rouge_clair;
        width: 20%;
        height: 55px;
        margin: 0;

        @include tablette_ecran {
            background-color: $blanc;
            width: 25%;
            height: 35px;
        }

        .destroy-icon {
            background-color: $groupomania_rouge;
            width: 57%;
            height: 35px;

            @include tablette_ecran {
                width: 45%;
                height: 35px;
            }
        }
    }
}


</style>