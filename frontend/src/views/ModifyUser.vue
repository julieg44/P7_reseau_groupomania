<template>
<div>
        <Entete/>
    <section class="account">   
        <div class='content'>
            <h1> Modifier votre compte</h1>
            <div class="createAccount">
                <form class="createUser" enctype="multipart/form-data">
                    <div class="formText">
                        <div class="creationUsername"><label>Votre nom d'utilisateur</label><input class="inputtext" type="text" v-model="username"></div>
                        <div class="creationEmail"><label>Votre email</label><input class="inputemail" type="email" v-model="email"></div>
                        <div class="creationPassword"><label>Votre mot de passe</label><input class="inputpassword" type="password" v-model="password"></div>
                    </div>
                    <div class="formImg">
                        <img src="../assets/avatar.jpg" alt="avatar"/>
                        <!-- <div class="upload_file_container"> -->
                            <!-- <label for="file">
                                Sélectionner une photo
                            </label> -->
                            <input class="inputfile" type="file" name="photo" @change="onFileSelected" />
                            <div class="supPhoto" @click="supPhoto()"><p>Supprimer la photo</p></div>
                        <!-- </div> -->
                    </div>
                </form>
                <router-link :to="_goBack"><BtnBleu label="Annuler"/></router-link><span id="retour-mobile"><br></span>
                <BtnRouge @click.prevent="modifyUser()" label="Modifier" />
            </div> 
        </div>
    </section> 
</div>
</template>

<script>
import Entete from '@/components/Entete.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import BtnBleu from '@/components/UI/Btn/BtnBleu.vue'
import Service from '@/services/service.js'


import { mapState } from "vuex";



const axios = require('axios');
let urlApi = "http://localhost:3000"


export default {
    name: 'ModifyUser',
    components: {
        Entete,
        BtnRouge,
        BtnBleu
    },
    props:['id'],

    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
        _goBack() {
            return '/main';
        }
    },



    data() {
        return {
            username: "",
            email: "",
            password: "",
            photo: "",
            selectedFile: null,
            user: null
        }
    },
    methods: {

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
        },

        supPhoto() {
            let token = 'Bearer ' + JSON.parse(localStorage.getItem('usertoken'));
            axios.put(urlApi + '/api/user/' + this.selectedUser + '/photo', {photo: null},{  
                headers: { 'Authorization': token } 
                })
                .then(function (response) {
                    console.log(response)
                    window.location.href = '/main';
                })
        },

        modifyUser() {
            let token = 'Bearer ' + JSON.parse(localStorage.getItem('usertoken'));

            // // modification d'une seule donnée

            if (this.username === "") {
                this.username = this.user.username
            }
            if (this.email === "") {
                this.email = this.user.email
            }
            

            const fd = new FormData()
            if(this.selectedFile !== null){
            fd.append('image', this.selectedFile, this.selectedFile.name)
            }
            fd.append('username', this.username)
            fd.append('email', this.email)
            // if (this.password !== ""){
            // fd.append('password', this.password)
            // }
            
            axios.put(urlApi + '/api/user/' + this.selectedUser, fd, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(function () {
                    window.location.href = '/main';
                })
        },


        // async loadProfil() {
        //     let user = await this.$store.dispatch('loadUser', {
        //             id: this.$route.params.id
        //         })
        //         .then(function (response) {
        //             return response;
        //         })
        //     return this.user = user;
        // }
    },

    created() {
        Service.getUser(this.selectedUser)
        .then (response => {
          this.user = response.data
        })
    },
}


</script>

<style lang="scss">

@import "../sass/main.scss";

</style>