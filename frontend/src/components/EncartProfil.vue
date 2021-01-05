<template>
    <div id="cartoucheProfil" v-if="userConnected">
        <div id="photo">
            <div id="taille-photo">
                <img id="principale" :src="userConnected.photo" alt="photo de profil" />
                <!-- <img id="cache"  src= "../assets/avatar-cache.png"  alt="cache-photo" /> -->
            </div>
        </div>
        <div class="closeProfil"><a href="#" id="closeProfil">X</a></div>
        <h2 class="profilName"> {{userConnected.username}}</h2>
        <p id="contenuProfil">
            Email :
            {{ userConnected.email }}
            <!-- <br />
            Mot de passe :
            *********
            <br /> -->
        </p>
        <div id="actionProfil">
            <BtnDeconnect @click="deconnect()" />
            <router-link :to="_modify">
            <BtnModifyUser/>
            </router-link>
            <BtnSup @click="supUser(userConnected.id)" />
        </div>
    </div>
    
</template>

<script>
const axios = require('axios');
let urlApi = "http://localhost:3000"

// @ is an alias to /src
import BtnSup from '@/components/UI/Btn/BtnSup.vue'
import BtnDeconnect from '@/components/UI/Btn/BtnDeconnect.vue'
import BtnModifyUser from '@/components/UI/Btn/BtnModifyUser.vue'
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
            return '/modifyUser/' + this.userConnected.id;
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
            let token = 'Bearer ' + JSON.parse(localStorage.getItem('usertoken'));
            axios.delete(urlApi + '/api/user/' + this.user.id, {
                    headers: {
                        'Authorization': token
                    }
                })
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

@import "../sass/main.scss";

#cartoucheProfil {
    width: 95%;
    background-color: $groupomania_rouge_clair;
    position: relative;
    padding-bottom: 7%;

    .closeProfil {
    position: absolute;
    bottom: 220px;
    right: 32px;
    }

    h2 {
        font-size: 1.3rem;
        font-weight: 300;
        color: $groupomania_rouge;
        text-align: left;
        text-transform: uppercase;
        margin-bottom: 5%;
        margin-left: 5%;
    }

    p {
        font-size: 0.8rem;
        color: $gris3;
        text-align: left;
        margin-left: 5%;
        line-height: 1.7rem;
    }

    #photo {
        background-color: $groupomania_rouge;
        text-align: left;
        height: 84px;
        margin-bottom: 25%;
        position: relative;



        img {
            width: 40%;
            height: 120px;
            margin: 5%;
            position: absolute;
                                clip-path:ellipse(50% 50%);

        }
    }

    #actionProfil {
        width: 80%;
        position: absolute;
        bottom: 45%;
        right: 10px;
        text-align: right;
    }

    @include tablette_ecran {
        width: 20%;
        margin-right: 2%;
        background-color: $blanc;
        position: relative;
        padding-bottom: 0;

        h2 {
            margin-top: 30%;
            margin-bottom: 3%;
            text-align: center;
        }

        #actionProfil {
            width: 100%;
            position: absolute;
            bottom: 0px;
            text-align: center;
        }

        #photo {
            // text-align: center;
            // background-color: $groupomania_rouge;
            height: 34%;

        #taille-photo{
            width:60%;
            margin: auto;
            
            
            img {
                width: 60%;
                margin: 0;
               margin-top: 10%;
               height: 120px;
            }
        }
            
        }
    }
    .button-user{
    background-color: $groupomania_rouge_clair;
    width: 20%;
    margin: 0;
    @include tablette_ecran{
        background-color: $blanc;
        width: 25%;
    }
    #destroy-icon{
        background-color: $groupomania_rouge;
        width: 45%;
    }
  }
}

</style>