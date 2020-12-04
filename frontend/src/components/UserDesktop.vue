<template>
    <section id="perso">
        <div class="content">
            <div id="flexInfos">
                <!-- cartouche info profil User desktop -->
                <div id="encartProfil">
                    <div id="photoProfil"><img src="../assets/avatar.png" alt="photo de profil" /></div>
                    <h2 class="nomProfil"> {{ fullName }}</h2>
                    <p id="infosProfil">
                        Email :<br>
                        {{ profilAffiche.email}}
                        <br />
                        Mot de passe :<br />
                        *********
                        <br />
                    </p>
                    <div id="align-boutons">
                        <BtnDeconnect @click="deconnect()"/>
                        <BtnModifyUser @click="modifyUser()"/>
                        <BtnSupUser @click="supUser(profilAffiche.id)"/>
                    </div>
                </div>
                <!-- partie post -->
                <div class="encartPost">
                    <div class="bienvenue">
                        <h1>Bonjour {{ fullName }} !</h1>
                        <div class="iconPerso">
                            <div class="notification"></div>
                            <div class="search"></div>
                        </div>
                    </div>
                    <p>De quoi souhaitez vous parler aujourd'hui ?</p>
                    <div class="post">
                        <input placeholder="écrivez-ici" type="text">
                        <div>
                            <BtnAddMedia />
                            <BtnPost />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import BtnPost from '@/components/BtnPost.vue'
import BtnAddMedia from '@/components/BtnAddMedia.vue'
import BtnSupUser from '@/components/BtnSupUser.vue'
import BtnDeconnect from '@/components/BtnDeconnect.vue'
import BtnModifyUser from '@/components/BtnModifyUser.vue'
import { mapState } from "vuex";
import { mapActions } from 'vuex';



export default {
  name: 'UserDesktop',
  components: {
    BtnPost, 
    BtnAddMedia,
    BtnSupUser,
    BtnDeconnect,
    BtnModifyUser
  },
  data(){
      return {
          profilAffiche : null
      }
  },

  computed: {
    ...mapState ({
    users: "users",
    selectedUser: "selectedUser",
    token: "token",
    }),
    fullName(){
              console.log(this.profilAffiche)

        return this.profilAffiche.username
    }
    
  },

   methods: {
   ...mapActions (['supUser', 'deconnect', 'modifyUser']),
  },

  created(){
    this.profilAffiche = this.$store.dispatch('loadUser',{id:this.$route.params.id})
  },

}
</script>

<style lang="scss">

@import "../sass/main.scss";


#perso {
    display: none;

    @include tablette_ecran {
        padding-bottom: 5%;
        height: 100%;
        display: block;
        background-color: $gris1;
        padding-top: 2%;
    }
}

#flexInfos {
    display: flex;
}

#encartProfil {
    width: 25%;
    margin-right: 2%;
    background-color: $blanc;
    position: relative;

    h2 {
        font-size: 1.3rem;
        font-weight: 300;
        color: $groupomania_rouge;
        text-transform: uppercase;
        margin-bottom: 5%;
        margin-top: 35%;
    }

    p {
        font-size: 0.8rem;
        color: $gris3;
        text-align: left;
        margin-left: 5%;
    }

    #align-boutons {
        width: 100%;
        position: absolute;
        bottom: 20px;
    }

    #photoProfil {
        background-color: $groupomania_rouge;
        height: 25%;
        margin-bottom: 25%;

        img {
            width: 60%;
            margin: 10%;
        }
    }
}

.encartPost {
    display: none;

    @include tablette_ecran {
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .bienvenue {
            display: flex;
            justify-content: flex-start;

            h1 {
                color: $groupomania_rouge;
                text-align: left;
                font-size: $textmoyen;
                font-weight: 700;
                margin-right: 15%;
                width: 85%;
            }

            .iconPerso {
                width: 15%;
                display: flex;
                justify-content: space-between;
                margin-right: 3%;

                .notification {
                    width: 25%;
                    background-color: $groupomania_rouge;
                    -webkit-mask: url(../assets/bell.svg);
                    mask: url(../assets/bell.svg);
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: 100%;
                }

                .search {
                    width: 28%;
                    background-color: $groupomania_rouge;
                    -webkit-mask: url(../assets/search.svg);
                    mask: url(../assets/search.svg);
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: 100%;
                }
            }
        }


        p {
            color: $gris3;
            font-size: $textmoyen;
            font-weight: 300;
            text-align: left;
        }

        .post {
            background-color: $blanc;
            margin-top: 2%;
            height: 60%;
            padding: 2% 2% 2% 2%;
            text-align: right;
        }

        input {
            border: none;
            color: $gris2;
            width: 100%;
            height: 80%;
        }
    }
}

</style>