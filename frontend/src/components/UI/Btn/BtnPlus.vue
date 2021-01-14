<template>
    <button class="plus" v-on="$listeners">
    </button>
</template>

<script>

export default {
  name: 'BtnPlus',
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";


  .plus {
    width: 10%;
    margin: 3%;
    // margin-top: 3%;
    // margin-bottom: 3%;
    background-color: $groupomania_bleu;
    -webkit-mask: url(../../../assets/telegram-plane-brands.svg);
    mask: url(../../../assets/telegram-plane-brands.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    @include tablette{
      width: 5%;
      // margin-top: 1%;
      // margin-bottom: 0;
      // margin-left: 3%;
      margin: 1% 3% 0 3%
    }

    @include ecran {
      width: 4%;
      // margin-top: 1%;
      // margin-bottom: 0;
      // margin-left: 3%;
            margin: 1% 3% 0 3%

    }
  }
</style>