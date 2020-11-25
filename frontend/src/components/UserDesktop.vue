<template>
    <section id="perso">
        <div class="content">
            <div id="flexInfos">
                <!-- cartouche info profil User desktop -->
                <div id="encartProfil">
                    <div id="photoProfil"><img src="../assets/avatar.png" alt="photo de profil" /></div>
                    <h2 class="nomProfil">Jean michel Motsuperlong</h2>
                    <p id="infosProfil">
                        Email :<br>
                        <br />
                        Mot de passe :<br />
                        <br />
                    </p>
                    <ul class="icons">
                        <li class="deconnect"></li>
                        <li class="modif"></li>
                        <li class="destroy"></li>
                    </ul>
                </div>
                <!-- partie post -->
                <div class="encartPost">
                    <div class="bienvenue">
                        <h1>Bonjour Jean-Michel !</h1>
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

export default {
  name: 'UserDesktop',
  components: {
    BtnPost, BtnAddMedia
  }
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

    ul {
        display: flex;
        justify-content: space-between;
        width: 40%;
        margin-left: 5%;
        height: 12%;
        padding: 0;
        position: absolute;
        bottom: 0;
    }

    .deconnect {
        width: 25%;
        // margin-right: 12%;
        background-color: $groupomania_rouge;
        mask: url(../assets/power_off.svg);
        -webkit-mask: url(../assets/power_off.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }

    .modif {
        width: 30%;
        // margin-right: 12%;
        background-color: $groupomania_rouge;
        mask: url(../assets/user_edit.svg);
        -webkit-mask: url(../assets/user_edit.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;

    }

    .destroy {
        width: 21%;
        // margin-right: 12%;
        background-color: $groupomania_rouge;
        -webkit-mask: url(../assets/trash.svg);
        mask: url(../assets/trash.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
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
            justify-content: flex-end;

            h1 {
                color: $groupomania_rouge;
                text-align: center;
                font-size: $texttitrepetit;
                font-weight: 700;
                margin-right: 15%;
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