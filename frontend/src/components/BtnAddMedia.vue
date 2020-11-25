<template>
  <!-- <router-link :to="{name:'Main',params:{id:Userid}}"> -->
    <button class="addmedia" v-on="$listeners">
        <slot name="plus">+</slot>
        <slot name="text"> Ajouter une image</slot>
    </button>
  <!-- </router-link> -->
</template>

<script>

export default {
  name: 'BtnAddMedia',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

  .addmedia{
    background-color: $blanc;
    color:$groupomania_rouge;
    font-weight: 400;
    border: solid 1px $groupomania_rouge;
    margin-top: 3%;
    margin-bottom: 3%;
    .plus{
        font-size: 3rem;
    }
    @include tablette_ecran{
        width: 25%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 3%;
    }
}


</style>