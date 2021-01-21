<template>
<nav v-if="userConnected">
    <div id="flexNav">
        <h1 v-if="admin===false"> Bonjour {{ userConnected.username }} !</h1>
        <h1 v-else id="admin"> Vous êtes connecté en tant qu'administrateur !</h1>
        <div class="icons">
            <div @mouseover="post=true" @mouseleave="post=false" @click="affUser" v-if="admin===false" id="bulle"><a href="#cartouchePost" id="openPost"><img src="../assets/bulle-rond.svg" alt="photo de profil" /></a></div>
            <div @mouseover="profil=true" @mouseleave="profil=false" @click="affUser" v-if="admin===false" id="profil"><a href="#cartoucheProfil" id="openProfil"><img src="../assets/user-solid-rond.svg" alt="photo de profil" /></a></div>
            <div @mouseover="deconnection=true" @mouseleave="deconnection=false" v-if="admin===false" id="deconnection"><img src="../assets/deconnect-rond.svg" alt="deconnection" @click="deconnect()"/></div> 
            <div @mouseover="chercher=true" @mouseleave="chercher=false" @click="openInput" v-if="admin===false" id="search"><img src="../assets/search.svg" alt="search" /></div> 
        </div>
        <div id="powerOff" v-if="admin===true" @click="deconnect()"><span class="deconnectIcon"><img src="../assets/power_off.svg"/></span><p>Déconnection </p></div>
    </div>
<Explain v-if="post===true" text="Cliquez pour poster un message"/>
<Explain v-if="profil===true" text="Cliquez pour modifier votre profil"/>
<Explain v-if="deconnection===true" text="Cliquez pour vous deconnecter"/>
<Explain v-if="chercher===true" text="Cliquez pour filtrer les messages d'un utilisateur"/>

</nav>
</template>


<script>

import Explain from '@/components/UI/Explication.vue'

export default {
    name: 'Nav',

    components: {
        Explain
    },

    data() {
        return {
            post: false,
            profil: false,
            deconnection: false,
            chercher: false
        }
    },


    props: {
        userConnected: {
            type: Object
        },
        admin: {
            type: Boolean
        }
    },

    methods: {
        affUser() {
            this.$emit('affichageUser')
        },
        openInput() {
            this.$emit('input')
        },

        deconnect() {
            localStorage.clear()
            window.location.href = "/"
        },

        input() {
            this.showInput = true
            this.showIcon = false
        },
    }
}

 </script> 

 <style lang="scss">

@import "../sass/main.scss";

nav {
    background-color: $groupomania-rouge;
    position: fixed;
    width: 100%;
    height: 49px;
    top: 70px;
    z-index: 10;

    #flexNav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-top: 12px;

        @include tablette_ecran {
            top: 70px;
            justify-content: center;
            margin-top: 5px;
        }
    }

    h1 {
        color: $blanc;
        margin-bottom: 0;
        font-weight: 400;
        margin-right: 2%;
        font-size: 1.3rem;

        @include tablette_ecran {
            font-size: 2rem;
            font-weight: 200;
        }
    }

    #admin {
        font-size: 0.9rem;

        @include tablette_ecran {
            font-size: 1.2rem;
            font-weight: 400;
        }
    }

    .icons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;


        #bulle,
        #profil,
        #deconnection,
        #search {
            width: 40px;
            height: 27px;
            background-color: $blanc;
            margin-left: 5%;
            margin-right: 5%;

            @include tablette_ecran {
                width: 60px;
                margin-left: 7%;
                margin-right: 7%;
            }

            &:hover {
                transform: scale(1.4);
            }
        }

        #bulle {
            -webkit-mask: url(../assets/bulle-rond.svg);
            mask: url(../assets/bulle-rond.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
        }

        #profil {
            -webkit-mask: url(../assets/user-solid-rond.svg);
            mask: url(../assets/user-solid-rond.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
        }

        #deconnection {
            -webkit-mask: url(../assets/deconnect-rond.svg);
            mask: url(../assets/deconnect-rond.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
        }

    }

    #search {
        -webkit-mask: url(../assets/search.svg);
        mask: url(../assets/search.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }

    #powerOff {
        width: 20%;

        p {
            display: none;

            @include tablette_ecran {
                display: block;
                color: $blanc;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        .deconnectIcon {
            width: 10%;

            img {
                width: 40%;
            }

            @include tablette_ecran {
                display: none;
            }
        }
    }
}

</style>