<template>
  <router-link to="/">
    <button id="insererPhoto" v-on="$listeners">
      <slot>Insérer une photo</slot>
    </button>
  </router-link>  
</template>

<script>

export default {
  name: 'BtnPostPhoto',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

  #insererPhoto{
      background-color: $gris2;
      margin-top: 3%;
      margin-bottom: 3%;
      @include tablette_ecran{
        margin-top: 9%;
        margin-bottom: 0;
        margin-left: 3%;
        width: 80%;
      }
  }
</style>