<template>
<div class='content'>
    <PopAlert/>
    <h1> Connectez-vous</h1>
    <form>
        <div id="email"><input placeholder="Votre email" v-model="email"></div>
        <div id="password"><input type="password" placeholder="Votre mot de passe" v-model="password"></div>
        <div id="connectEcran">
            <BtnRouge @click.prevent="login()" label="connexion"/>
            <router-link to="/signUp">
            <p id='newAccount'>Pas encore de compte ?</p>
            </router-link>
        </div>
    </form>
</div>              
</template>

<script>
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import PopAlert from '@/components/PopAlert.vue'
import Service from '@/services/service.js'

export default {
    name: 'login',
    components: {
        BtnRouge,
        PopAlert
    },
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {

        login() {
            let user = {
                email: this.email,
                password: this.password
            };
            Service.login(user)
                .then(function (response) {
                    let userlogged = response.data
                    localStorage.setItem('usertoken', JSON.stringify(userlogged.token));
                    localStorage.setItem('userId', JSON.stringify(userlogged.userId))
                    window.location.href = '/main';
                })
        },
    }
}
</script>

<style lang="scss">
@import "../sass/main.scss";
.content{
    max-width: 980px;
    margin: auto;
}
h1{
    font-size: $texttitre;
    text-align: center;
    color:$text-noir;
    font-weight: 100;
    margin-bottom: 5%;
}
form{
    width: 90%;
    margin: auto;
    @include tablette_ecran{
        width: 50%;
    }
}
#email, #password{ 
    input{
    width:100%;
    height: 30px;
    background-color: #fff;
    border: none;
    margin-bottom: 3%;
    text-align: center;
    color: $gris3;
    font-size: $textpetit;
    @include tablette_ecran{
        height: 35px;   
        margin-bottom: 5%;
    }
    }
}
#newAccount{
    color: $groupomania_rouge;
    text-decoration: underline;
    font-size: $textpetit;
    font-weight: 700;
    margin-block-end: 0;
}
#connectEcran{
    @include tablette_ecran{
        display: flex;
        flex-direction: row-reverse;
        align-items: baseline;
    }
}
</style>