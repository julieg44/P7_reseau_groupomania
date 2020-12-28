<template>
<div>
    <header>
        <Header/>
    </header>
    <section id="signUp">
        <div class='content'>
            <h1> Modifier votre compte</h1>
            <div id="createAccount">
                <form id="createUser" enctype="multipart/form-data">
                    <div id="formText">
                        <div id="creationUsername"><label>Votre nom d'utilisateur</label><input class="inputtext" type="text" v-model="username"></div>
                        <div id="creationEmail"><label>Votre email</label><input class="inputemail" type="email" v-model="email"></div>
                        <div id="creationPassword"><label>Votre mot de passe</label><input class="inputpassword" type="password" v-model="password"></div>
                    </div>
                    <div id="formImg">
                        <img src="../assets/avatar.jpg" alt="avatar"/>
                        <div class="upload_file_container">
                            <label for="file">
                                Sélectionner une photo
                            </label>
                            <input class="inputfile" type="file" name="photo" @change="onFileSelected" />
                        </div>
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
import Header from '@/components/Header.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import BtnBleu from '@/components/UI/Btn/BtnBleu.vue'
import Service from '@/services/service.js'


import { mapState } from "vuex";



const axios = require('axios');
let urlApi = "http://localhost:3000"


export default {
    name: 'ModifyUser',
    components: {
        Header,
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
            return '/main/' + this.$route.params.id;
        }
    },



    data() {
        return {
            username: "",
            email: "",
            password: "",
            photo: "",
            selectedFile: null,
            // user: null
        }
    },
    methods: {

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile)
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
            // if (this.password === "") {
            //     this.password = this.user.password
            // }

            const fd = new FormData()
            if(this.selectedFile !== null){
            fd.append('image', this.selectedFile, this.selectedFile.name)
            }
            fd.append('username', this.username)
            fd.append('email', this.email)
            // fd.append('password', this.password)
            axios.put(urlApi + '/api/user/' + this.$route.params.id, fd, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(function (response) {
                    window.location.href = '/main/' + response.data.data.id;
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
        Service.getUser(this.id)
        .then (response => {
          this.user = response.data
        })
    },
}


</script>

<style lang="scss">

@import "../sass/main.scss";


#signUp {
  background-color: $gris1;
  height: 980px;
  padding-top: 10%;
}

.content{
    max-width: 980px;
    margin: auto;
}

#createAccount{
    width: 90%;
    background-color: #fff;
    // padding: 2% 2% 2% 2%;
    padding-top: 7%;
    padding-bottom: 2%;
    margin: auto;
    margin-top: 30px;
    @include tablette_ecran{
        padding-top: 2%;
    }
}

h1{
    font-size: $texttitre;
    text-align: center;
    color:$text-noir;
    font-weight: 100;
    margin-bottom: 5%;
}

#createUser{
    width: 90%;
    margin: auto;
    @include tablette_ecran{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

#formText{
    margin-bottom: 15%;
    @include tablette_ecran{
        margin-bottom: 0;
        width: 70%;
    }
}

#formImg {
    margin-bottom: 15%;
    margin: auto;
    @include tablette_ecran{ 
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3%;
        }   
        .upload_file_container {
        width: 60%;
        height: 25px;
        position: relative;
        background-color: $gris2;
        padding: 3px;
        color: #fff;
        font-family: 'roboto';
        font-size: 0.8rem;
        font-weight: 700;
        margin: auto;
        margin-bottom: 15%;
        @include tablette_ecran{
        width: 72%;
        }
    }
    ///// @todo stylisation input /////
    // .inputfile {
    //     display: none;
    // }
    img{
    width: 80%;
    @include tablette_ecran{
        width: 55%;
        margin-bottom: 4%;
    }
    }
    input{
        background-color: #fff;
        border: none;
        text-decoration: none;
    }
}


#creationUsername, #creationEmail, #creationPassword{
    margin-bottom: 5%;
    @include tablette_ecran{
    margin-bottom: 0;
    display: flex;
    align-items: baseline;
        label{
            font-size: $textpetit;
            width: 40%;
            text-align: left;
            }
        }
}



.inputtext, .inputemail, .inputpassword{
    width:100%;
    height: 30px;
    background-color:$gris1;
    border: none;
    margin-bottom: 3%;
    text-align: center;
    color: $text-noir;
    @include tablette_ecran{
        height: 35px;
        width: 100%;
        margin-bottom: 5%;
    }
}


#retour-mobile{
    @include tablette_ecran{
        display: none;
    }
}

</style>