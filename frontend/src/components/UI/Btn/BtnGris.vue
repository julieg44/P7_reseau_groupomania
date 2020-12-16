<template>
    <button id="btngris" v-on="$listeners">
      <slot>{{ label }}</slot>
    </button>
</template>

<script>

export default {
  name: 'BtnGris',
  props:{type:String, required:true}
}
</script>

<style lang="scss">

@import "../../../sass/main.scss";
@import "../../../sass/button.scss";


  #btngris{
      background-color: $gris2;
      @include tablette_ecran{
        margin-top: 9%;
        width: 80%;
      }
  }
</style>