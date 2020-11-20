<template>
  <button id="annuler" v-on="$listeners">
    <slot>Annuler</slot>
  </button>
</template>

<script>

export default {
  name: 'BtnAnnuler',
}
</script>

<style lang="scss">

@import "../sass/main.scss";


  #annuler{
      background-color: $groupomania_bleu;
      margin-top: 3%;
      margin-bottom: 3%;
      @include tablette_ecran{
          margin-top: 0;
          margin-bottom: 0;
          margin-left: 3%;
      }
  }

  a.router-link-active {
  width: 100%;
  }

</style>