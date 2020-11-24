<template>
<div>
    <header>
        <Header/>
    </header>
    <section>
        <div id='content'>
            <h1> Créez votre compte</h1>
            <div id="createAccount">
                <form id="createUser">
                    <div id="formText">
                        <div id="creationUsername"><label>Votre nom d'utilisateur</label><input type="text" v-model="username"></div>
                        <div id="creationEmail"><label>Votre email</label><input type="email" v-model="email"></div>
                        <div id="creationPassword"><label>Votre mot de passe</label><input type="text" v-model="password"></div>
                    </div>
                    <div id="formImg"><img src="../assets/avatar.jpg" alt="avatar"/></div>
                </form>
                <router-link to="/"><BtnAnnuler/></router-link><span id="retour-mobile"><br></span>
                <BtnValider @click="signup()"/>
            </div> 
        </div>
    </section> 
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import BtnValider from '@/components/BtnValider.vue'
import BtnAnnuler from '@/components/BtnAnnuler.vue'

import { mapActions } from 'vuex';


export default {
    name:'signUp',
    components: { 
        Header, BtnValider, BtnAnnuler
    },
    data(){
    return {username:"", email:"", password:""}
    },
    methods: {
        ...mapActions(['signup']),
        signup(){
            this.$store.dispatch('signup', {
                username:this.username,
                email:this.email,
                password:this.password
            })
        }
    }
}

</script>

<style lang="scss">

@import "../sass/main.scss";


section {
  background-color: $gris1;
  height: 980px;
}

#content{
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
    img{
    width: 80%;
    @include tablette{
        width: 70%;
    }
    }
    @include tablette_ecran{
        margin-bottom: 4%;
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