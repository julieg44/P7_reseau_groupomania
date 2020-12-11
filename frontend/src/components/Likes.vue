<template>
    <div id='align'>
        <p class="nbr">2</p>
        <div id="like"></div>
        <p class="nbr">3</p>
        <div id="dislike"></div>
        <p class="nbr">2</p>
        <div id="bulle"></div>
    </div>
</template>


<script>
// @ is an alias to /src

export default {
  name: 'Likes',
  components: {
  },

  computed: {
 
  },

   methods: {

  },

    created(){

  },
}


</script>

<style lang="scss">@import "../sass/main.scss";

#align{
    display: flex;
    flex-direction: row;
    margin-top: 8%;
    margin-bottom: 8%;
    height: 17px;
    .nbr    {
        font-weight: 700;
        margin-right: 0.5%;
        font-size: $textpetit;
    }
    #like{
        margin-right: 5%;
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #dislike{
        margin-right: 5%;
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_down.svg);
        mask: url(../assets/thumbs_down.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #bulle{
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/bulle.svg);
        mask: url(../assets/bulle.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    @include tablette_ecran{
        margin-top: 2%;
        margin-bottom: 2%;
        height: 17px;
        #like, #dislike, #bulle{
            width: 2%;
            margin-right: 3%;
        }
        #nbr{
            font-size: 0.6rem;
        }
    }
}

</style>