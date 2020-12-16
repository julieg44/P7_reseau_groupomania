<template>
  <!-- <router-link :to="{name:'Main',params:{id:Userid}}"> -->
    <button class="envoyer" v-on="$listeners">
      <slot>Envoyer</slot>
    </button>
  <!-- </router-link> -->
</template>

<script>

export default {
  name: 'BtnPost',
}
</script>

<style lang="scss">

@import "../sass/main.scss";


  .envoyer{
      background-color: $groupomania_rouge;
      @include tablette_ecran{
          margin-top: 0;
          margin-bottom: 0;
          margin-left: 3%;
      }
  }

</style>