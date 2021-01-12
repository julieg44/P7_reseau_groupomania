<template>
<nav v-if="userConnected">
<h1> Bonjour {{ userConnected.username }} !</h1>
<div class="icons" @click="affUser">
    <div id="bulle"><a href="#cartouchePost" id="openPost"><img src="../assets/bulle-rond.svg" alt="photo de profil" /></a></div>
    <div id="profil"><a href="#cartoucheProfil" id="openProfil"><img src="../assets/user-solid-rond.svg" alt="photo de profil" /></a></div>
    <div id="deconnection"><img src="../assets/deconnect-rond.svg" alt="deconnection" @click="deconnect()"/></div> 
</div>

</nav>
</template>


<script>

export default {
  name: 'Nav',


   props: {
        userConnected:{ type:Object}
    },

    methods:{
        affUser(){
            this.$emit('affichageUser')
        },

        deconnect(){
            localStorage.clear()
            window.location.href="/"
        }
    }
  
}

 </script> 

 <style lang="scss">

@import "../sass/main.scss";

nav{
    background-color: $groupomania-rouge;
    position: fixed;
    width: 100%;
    height: 49px;
    top: 60px;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @include tablette_ecran{
        top: 70px
    }

    h1{
        color: $blanc;
        margin-bottom: 0;
        font-weight: 400;
        margin-right: 2%;
        font-size: 1.3rem;
        @include tablette_ecran{
            font-size: 2rem;
            font-weight: 200;
        }
    }

    .icons{ 
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;


    #bulle{
        width: 50px;
        height: 33px;
        background-color: $blanc;
        -webkit-mask: url(../assets/bulle-rond.svg);
        mask: url(../assets/bulle-rond.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
        margin-left: 7%;
    margin-right: 7%;
    }
    #profil{
        width: 50px;
                height: 33px;

        background-color: $blanc;
        -webkit-mask: url(../assets/user-solid-rond.svg);
        mask: url(../assets/user-solid-rond.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
        margin-left: 7%;
    margin-right: 7%;
    }
    #deconnection{
        width: 50px;
        height: 33px;
        background-color: $blanc;
        -webkit-mask: url(../assets/deconnect-rond.svg);
        mask: url(../assets/deconnect-rond.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
        margin-left: 7%;
    margin-right: 7%;
    }
    }

}

</style>