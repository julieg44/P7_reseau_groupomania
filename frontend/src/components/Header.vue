<template>
    <div>
        <div id="logoGroupomania"></div>
        <section id="bandeauMobile">
            <div id="photoProfilMobile">
                <a href="#cartoucheProfil" id="openProfil"><img src="../assets/avatar.png" alt="photo de profil" /></a>
            </div>
            <div class="iconPerso">
                <div class="notification"></div>
                <div class="search"></div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'header'
}
</script>

<style lang="scss">

@import "../sass/main.scss";


#bandeauMobile {
    display: flex;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 2%;
    height: 50px;
    background-color: $groupomania_bleu;
    border-top: 1px solid $blanc;

    img {
        width: 45%;
    }

    #photoProfilMobile {
        width: 30%;
        margin-right: 45%;
        text-align: left;
    }

    .iconPerso {
        width: 20%;
        display: flex;
        padding-top: 4%;

        .notification {
            width: 100%;
            margin-right: 35%;
            background-color: $blanc;
            -webkit-mask: url(../assets/bell.svg);
            mask: url(../assets/bell.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
        }

        .search {
            width: 100%;
            background-color: $blanc;
            -webkit-mask: url(../assets/search.svg);
            mask: url(../assets/search.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100%;
        }
    }

    @include tablette_ecran {
        display: none;
    }
}

    



</style>