<template>
<div id='content'>
    <h1> Connectez-vous</h1>
    <form>
        <div id="email"><input placeholder="Votre email"></div>
        <div id="password"><input placeholder="Votre mot de passe"></div>
        <div id="connectEcran">
            <BtnConnexion/>
            <router-link to="/signUp">
            <p id='newAccount'>Pas encore de compte ?</p>
            </router-link>
        </div>
    </form>
</div>   
</template>

<script>
import BtnConnexion from '@/components/BtnConnexion.vue'

export default {
    name:'login',
    components: { BtnConnexion,
    }
}

</script>

<style lang="scss">

@import "../sass/main.scss";

#content{
    max-width: 980px;
    margin: auto;
}

#login{
    background-color: $gris1;
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
    color: $gris2;
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