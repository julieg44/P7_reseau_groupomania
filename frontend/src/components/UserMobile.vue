<template>
<div>
    <section id="bandeauMobile">
        <div class="bienvenue">
            <div id="photoProfilMobile">
                <a href="#wrapProfil" id="openProfil"><img src="../assets/avatar.png" alt="photo de profil" /></a>
            </div>
            <div class="iconPerso">
                <div class="notification"></div>
                <div class="search"></div>
            </div>
        </div>
    </section>

    <section id="bienvenueMobile">
        <div class="bienvenue">
            <h1>Bonjour Jean-Michel !</h1>
            <div class="postIcon">
                <a href="#wrapPost" id="openPost">
                    <img src="../assets/comment.svg" />
                </a>
            </div>
        </div>
    </section>

    <!-- au clic ouverture profil User complet -->

    <section id="wrapProfil">
        <div id="encartProfilMobile">
            <div class="flex">
                <div id="photoProfilMobile"><img src="../assets/avatar.png" alt="photo de profil" /></div>
                <div class="closeProfil"><a href="#" id="closeProfil">X</a></div>
            </div>
            <ul class="icons">
                <li class="deconnect"></li>
                <li class="modif"></li>
                <li class="destroy"></li>
            </ul>
            <h2 class="nomProfil">Jean michel Motsuperlong</h2>
            <p id="infosProfilMobile">
                Email :
                <br />
                Mot de passe :
            </p>
        </div>
    </section>


    <!-- au clic ouverture post -->
    <section id="wrapPost">
        <p>De quoi souhaitez vous parler aujourd'hui ?</p>
        <div class="post">
            <div class="closePost"><a href="#" id="closePost">X</a></div>
            <input placeholder="écrivez-ici" type="text">
            <BtnAddMedia />
            <BtnPost />
        </div>
    </section>

</div>
           
</template>

<script>
// @ is an alias to /src
import BtnPost from '@/components/BtnPost.vue'
import BtnAddMedia from '@/components/BtnAddMedia.vue'

export default {
  name: 'UserMobile',
  components: {
    BtnPost, BtnAddMedia
  }
}
</script>

<style lang="scss">

@import "../sass/main.scss";

#bandeauMobile{
    padding-top: 2%;
    padding-bottom: 2%;
    height: 65px;
    background-color: $groupomania_bleu;
    border-top: 1px solid $blanc;
    img{
        width: 50%;
    }
    .bienvenue{
        display: flex;
        #photoProfilMobile{
            width: 30%;
            margin-right: 45%;
        }
        .iconPerso{  
        width: 20%; 
        display: flex; 
        padding-top: 4%; 
        .notification{
            width: 100%;
            margin-right: 35%;
            background-color: $blanc;       
            -webkit-mask:url(../assets/bell.svg);
            mask: url(../assets/bell.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
            }
        .search{
            width: 100%;
            background-color: $blanc;       
            -webkit-mask:url(../assets/search.svg);
            mask: url(../assets/search.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
            }
        }
    }
    @include tablette_ecran{
        display: none;
    }
}
/// intro ////

#bienvenueMobile{
    height: 100%;
    padding: 8% 5% 3% 3%;
    background-color: $blanc;
    .bienvenue{
        display: flex;
        justify-content: space-between;
    }
    h1{
    color: $groupomania_rouge;
    font-size:1.4rem;
    font-weight: 700;
    }
    .postIcon{
        width: 10%;
    }
    @include tablette_ecran{
        display: none;
    }
}


/// section Post Mobile ////
#wrapPost{
    width: 95%;
    margin: auto;
    padding:0% 0% 3% 0% ;
    margin-top: -84%;    
    height: 100%;
    background-color: $blanc;
    .encartPost{
        display: block;
    }
    .post{
        background-color: $gris1;
        margin-top: 2%;
        height: 90%;
        padding: 2% 2% 2% 2%;
        text-align: right;
    }
    .closePost{
        color: $gris3;
    }
    input{
        border: none;
        color: $gris2;
        width: 100%;
        height: 140px;
        background-color: $gris1;
    }
    @include tablette_ecran{
        display: none;
    }
}

/// section Profil mobile /////

#wrapProfil{
    width: 95%;
    padding: 0;
    margin: auto;
    margin-top: 2%;
    height: 100%;
    background-color: $groupomania_rouge_clair;
    .flex{
        display: flex;
        background-color: #c2595d;
        padding: 2% 2% 2% 2%;
        height: 65px;
        margin-bottom: 5%;
    }
    #encartProfilMobile{
        width: 100%;
    }
    #photoProfilMobile{
    background-color: #c2595d;
    padding: 2% 2% 2% 2%;
    text-align: left;
    width: 90%;
    img{
        width: 40%;
        margin: 4%;
        }
    }
    .closeProfil{
        color:$blanc;
        padding-top: 5%;
    }
    h2{
    font-size: 1.3rem;
    font-weight: 300;
    color:$groupomania_rouge;
    text-transform: uppercase;
    margin-bottom: 5%;
    }
        ul{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 45px;
        margin-left: 5%;
        padding: 0;
        padding-right: 5%;
        margin-bottom: 5%;
    }
    .deconnect{
        width: 17%;
        background-color: $groupomania_rouge;
        mask: url(../assets/power_off.svg);
        -webkit-mask:url(../assets/power_off.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 50%;
    }
    .modif{
        width: 20%;
        background-color: $groupomania_rouge;
        mask: url(../assets/user_edit.svg);
        -webkit-mask:url(../assets/user_edit.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 50%;

    }
    .destroy{
        width: 15%;
        background-color: $groupomania_rouge;       
        -webkit-mask:url(../assets/trash.svg);
        mask: url(../assets/trash.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 50%;
    }
    p{
        font-size: 0.8rem;
        color: $gris3;
        text-align: left;
        margin-left: 5%;
        line-height: 2.5rem;
    }
    @include tablette_ecran{
        display: none;
    }
}
</style>