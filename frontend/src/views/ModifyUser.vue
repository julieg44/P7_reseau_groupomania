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
                        <div id="creationUsername"><label>Votre nom d'utilisateur</label><input type="text" v-model="username"></div>
                        <div id="creationEmail"><label>Votre email</label><input type="email" v-model="email"></div>
                        <div id="creationPassword"><label>Votre mot de passe</label><input type="text" v-model="password"></div>
                    </div>
                    <div id="formImg"><img src="../assets/avatar.jpg" alt="avatar"/>
                        <input type="file" @change="onFileSelected"/>
                    </div>
                </form>
                <router-link to="/"><BtnAnnuler/></router-link><span id="retour-mobile"><br></span>
                <BtnValider @click="modifyUser()"/>
            </div> 
        </div>
    </section> 
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import BtnValider from '@/components/BtnValider.vue'
import BtnAnnuler from '@/components/BtnAnnuler.vue'

import { mapState } from "vuex";



const axios = require('axios');
let urlApi = "http://localhost:3000"


export default {
    name:'ModifyUser',
    components: { 
        Header, BtnValider, BtnAnnuler
    },
    computed:{
            ...mapState ({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
    },
    data(){
    return {username:"", email:"", password:"", photo:"", selectedFile:null, user:null}
    },
    methods: {

        onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },

        modifyUser() {
            let token = 'Bearer ' + JSON.parse(localStorage.getItem('usertoken'));

            // // modification d'une seule donnée

            if (this.username === "") {
                this.username = this.user.username
            }
            if (this.selectedFile === "") {
                this.selectedFile = this.user.photo
            }
            if (this.email === "") {
                this.email = this.user.email
            }
            if (this.password === "") {
                this.password = this.user.password
            }

            console.log(this.selectedFile)
            const fd = new FormData()
            fd.append('image', this.selectedFile, this.selectedFile.name)
            fd.append('username', this.username)
            fd.append('email', this.email)
            fd.append('password', this.password)
            console.log(fd)

            console.log(this.$route.params.id)
            console.log(localStorage)
            debugger;
            axios.put(urlApi + '/api/user/' + this.$route.params.id, fd, {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(function (response) {
                    console.log(response)
                    window.location.href = '/main/' + response.data.data.id;
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

    created(){
    console.log('trop tot')
        this.loadProfil() 
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
    @include tablette_ecran{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5%;

    }
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



input{
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