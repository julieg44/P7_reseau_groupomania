<template>
  <button v-on="$listeners">
    <slot>Connexion</slot>
  </button>
</template>

<script>

export default {
  name: 'BtnConnexion',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

  button{
    width: 50%;
    height: 30px;
    background-color: $groupomania_rouge;
    color:#fff;
    font-weight: 700;
    border: none;
    margin-top: 3%;
    margin-bottom: 3%;
    @include tablette_ecran{
        width: 25%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 3%;
    }
}

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