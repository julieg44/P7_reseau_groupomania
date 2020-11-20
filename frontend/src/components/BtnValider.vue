<template>
  <button v-on="$listeners">
    <slot>Valider</slot>
  </button>
</template>

<script>

export default {
  name: 'BtnValider',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

  button{
      background-color: $groupomania_rouge;
      margin-top: 3%;
      margin-bottom: 3%;
      @include tablette_ecran{
          margin-top: 0;
          margin-bottom: 0;
          margin-left: 3%;
      }
  }
</style>