<template>
    <div>
        <PopAlert />
        <Entete />
        <section class="account">
            <div class='content'>
                <h1> Créez votre compte</h1>
                <div class="createAccount">
                    <form class="createUser" enctype="multipart/form-data">
                        <div class="formText">
                            <div class="creationUsername"><label>Votre nom d'utilisateur</label><input class="inputtext"
                                    type="text" v-model="username"></div>
                            <div class="creationEmail"><label>Votre email</label><input class="inputemail" type="email"
                                    v-model="email"></div>
                            <div class="creationPassword"><label>Votre mot de passe</label><input class="inputpassword"
                                    type="password" v-model="password"></div>
                        </div>
                        <div class="formImg">
                            <img src="../assets/avatar.jpg" alt="avatar" />
                            <input class="inputfile" type="file" name="photo" @change="onFileSelected" />
                        </div>
                    </form>
                    <router-link to="/">
                        <BtnBleu label="Annuler" />
                    </router-link><span id="retour-mobile"><br></span>
                    <BtnRouge @click="signup()" label="Valider" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Entete from '@/components/Entete.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import BtnBleu from '@/components/UI/Btn/BtnBleu.vue'
import PopAlert from '@/components/PopAlert.vue'
import Service from '@/services/service.js'

// alerte
function customAlert (){
  this.render = function(dialog){
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let popup = document.getElementById ('popup');
      let popupContent = document.getElementById ('popup-content');
      popup.style.display = 'block';
      popup.style.height = winH + 'px';
      popupContent.style.left = (winW/2) - (500 * .5) + 'px';
      if (winW < 569){
          popupContent.style.left = (winW/2) - (270 * .5) + 'px';
      }
      popupContent.style.display = "block";
      document.getElementById('popup-bottom').innerHTML = ' <button id="fermer"> Ok ! </button> ';
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
        Entete,
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
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        signup() {
            let validInput = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

            const fd = new FormData()
            if (this.selectedFile !== null) {
                fd.append('image', this.selectedFile, this.selectedFile.name)
            }
            fd.append('username', this.username)
            fd.append('email', this.email)
            if (validInput.test(this.password) === true){
                fd.append('password', this.password)
            } else {
               let alert = new customAlert();
                alert.render("Erreur ! </br> <span id='pluspetit'>" + "le mot de passe doit contenir 8 caractères, 1 Majuscule et 1 chiffre" + "</span>") 
            }
            
            Service.createUser(fd)
                .then(function (response) {
                    if (response.status !== 201) {
                        let erreur = response.data.error
                        let alert = new customAlert();
                        alert.render("Erreur ! </br> <span id='pluspetit'>" + erreur + "</span>")
                    } else { 
                    let alert = new customAlert();
                    alert.render("Bienvenue " + response.data.user.username + " ! <span id='pluspetit'> </br> Votre compte à été créé, vous pouvez désormais vous connecter</span>")
                    }              
                })
        },
    },
}
</script>


<style lang="scss">
@import "../sass/main.scss";
</style>

