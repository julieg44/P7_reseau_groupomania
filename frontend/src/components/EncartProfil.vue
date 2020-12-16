<template>
    <div id="cartoucheProfil" v-if="user">
        <div id="photo">
            <div id="taille-photo">
                <img id="principale" :src="user.photo" alt="photo de profil" />
                <img id="cache"  src= "../assets/avatar-cache.png"  alt="cache-photo" />
            </div>
        </div>
        <div class="closeProfil"><a href="#" id="closeProfil">X</a></div>
        <h2 class="profilName"> {{ user.username }}</h2>
        <p id="contenuProfil">
            Email :
            {{ this.user.email }}
            <br />
            Mot de passe :
            *********
            <br />
        </p>
        <div id="actionProfil">
            <BtnDeconnect @click="deconnect()" />
            <router-link :to="_modify">
            <BtnModifyUser/>
            </router-link>
            <BtnSupUser @click="supUser(user.id)" />
        </div>
    </div>
</template>

<script>
const axios = require('axios');
let urlApi = "http://localhost:3000"

// @ is an alias to /src
import BtnSupUser from '@/components/UI/Btn/BtnSupUser.vue'
import BtnDeconnect from '@/components/UI/Btn/BtnDeconnect.vue'
import BtnModifyUser from '@/components/UI/Btn/BtnModifyUser.vue'
import { mapState } from "vuex";
import { mapActions } from 'vuex';



export default {
    name: 'EncartProfil',
    components: {
        BtnSupUser,
        BtnDeconnect,
        BtnModifyUser
    },
    data() {
        return {
            user: null
        }
    },

    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
        _modify() {
            return '/modifyUser/' + this.user.id;
        }
    },


    methods: {
        ...mapActions(['supUser', 'deconnect']),

        async loadProfil() {
            let user = await this.$store.dispatch('loadUser', {
                    id: this.$route.params.id
                })
                .then(function (response) {
                    return response;
                })
            return this.user = user;
        },
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
        this.loadProfil()
        console.log(this.user)
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
            margin: 5%;
            position: absolute;
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
        width: 25%;
        margin-right: 2%;
        background-color: $blanc;
        position: relative;
        padding-bottom: 0;

        h2 {
            margin-top: 40%;
            text-align: center;
        }

        #actionProfil {
            width: 100%;
            position: absolute;
            bottom: 20px;
            text-align: center;
        }

        #photo {
            // text-align: center;
            // background-color: $groupomania_rouge;
            height: 25%;

        #taille-photo{
            width:60%;
            margin: auto;
            
            
            img {
                width: 60%;
                margin: 0;
               margin-top: 10%;
               height: 147px;
            }
        }
            
        }
    }
}

</style>