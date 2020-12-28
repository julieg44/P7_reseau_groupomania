<template>
<div>
    <PopAlert />
    <header>
        <Header/>
    </header>
    <section id="signUp">
        <div class='content'>
            <h1> Créez votre compte</h1>
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
                <router-link to="/"><BtnBleu label="Annuler"/></router-link><span id="retour-mobile"><br></span>
                <BtnRouge @click="signup()" label="Valider"/>
            </div> 
        </div>
    </section> 
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import BtnBleu from '@/components/UI/Btn/BtnBleu.vue'
import PopAlert from '@/components/PopAlert.vue'


import { mapActions } from 'vuex';
const axios = require('axios');
let urlApi = "http://localhost:3000"

// alerte
function customAlert (){
  this.render = function(dialog){
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let popup = document.getElementById ('popup');
      let popupContent = document.getElementById ('popup-content');
      popup.style.display = 'block';
      popup.style.height = winH + 'px';
      popupContent.style.left = (winW/2) - (980 * .5) + 'px';
      if (winW < 569){
          popupContent.style.left = (winW/2) - (260 * .5) + 'px';
      }
      popupContent.style.display = "block";
      document.getElementById('popup-head').innerHTML = ' <button id="fermer"> X </button> ';
      document.getElementById('popup-text').innerHTML = dialog;
      let buttonAlert = document.getElementById('fermer');
      buttonAlert.addEventListener ('click', function(){
        window.location.href = '/'
      })
  }
  this.ok = function(){
      document.getElementById('popup').style.display = 'none';
      document.getElementById('popup-content').style.display = 'none';
  }
}



export default {
    name: 'signUp',
    components: {
        Header,
        BtnRouge,
        BtnBleu,
        PopAlert
    },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            photo: "",
            selectedFile: null
        }
    },
    methods: {
        ...mapActions(['signup']),

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        signup() {
            if (this.selectedFile !== null) {
                const fd = new FormData()
                fd.append('image', this.selectedFile, this.selectedFile.name)
                fd.append('username', this.username)
                fd.append('email', this.email)
                fd.append('password', this.password)
                axios.post(urlApi + '/api/user/signup', fd)
                    .then(function (response) {
                        let alert = new customAlert();
                        alert.render("Bienvenue " + response.data.user.username + " ! <span style='font-size:1.5rem'> </br> Votre compte à été créé, vous pouvez désormais vous connecter</span>")
                    })
                
            } else {
                let NewUser = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                axios.post(urlApi + '/api/user/signup', NewUser)
                    .then(function (response) {
                        let alert = new customAlert();
                        alert.render("Bienvenue " + response.data.user.username + " ! <span style='font-size:1.5rem'> </br> Votre compte à été créé, vous pouvez désormais vous connecter</span>")
                    })
            }
        },
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

.content {
    max-width: 980px;
    margin: auto;
}

#createAccount {
    width: 90%;
    background-color: #fff;
    // padding: 2% 2% 2% 2%;
    padding-top: 7%;
    padding-bottom: 2%;
    margin: auto;
    margin-top: 30px;

    @include tablette_ecran {
        padding-top: 2%;
    }
}

h1 {
    font-size: $texttitre;
    text-align: center;
    color: $text-noir;
    font-weight: 100;
    margin-bottom: 5%;
}

#createUser {
    width: 90%;
    margin: auto;

    @include tablette_ecran {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

#formText {
    margin-bottom: 15%;

    @include tablette_ecran {
        margin-bottom: 0;
        width: 70%;
    }
}

#formImg {
    margin-bottom: 15%;

    @include tablette_ecran {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5%;

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

        @include tablette_ecran {
            width: 72%;
        }
    }

    ///// @todo stylisation input /////
    // .inputfile {
    //     display: none;
    // }
    img {
        width: 80%;

        @include tablette_ecran {
            width: 55%;
            margin-bottom: 4%;
        }
    }

    input {
        background-color: #fff;
        border: none;
        text-decoration: none;
    }
}


#creationUsername,
#creationEmail,
#creationPassword {
    margin-bottom: 5%;

    @include tablette_ecran {
        margin-bottom: 0;
        display: flex;
        align-items: baseline;

        label {
            font-size: $textpetit;
            width: 40%;
            text-align: left;
        }
    }
}



input {
    width: 100%;
    height: 30px;
    background-color: $gris1;
    border: none;
    margin-bottom: 3%;
    text-align: center;
    color: $text-noir;

    @include tablette_ecran {
        height: 35px;
        width: 100%;
        margin-bottom: 5%;
    }
}


#retour-mobile {
    @include tablette_ecran {
        display: none;
    }
}

</style>