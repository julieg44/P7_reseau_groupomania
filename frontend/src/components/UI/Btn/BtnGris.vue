<template>
    <button id="btnGris" v-on="$listeners">
      <slot>{{label}}</slot>
    </button>
</template>

<script>

export default {
  name: 'BtnGris',
  props:{
    label:{type:String, required:true}
    },
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";

  #btnGris{
      background-color: $gris2;
  }
</style>