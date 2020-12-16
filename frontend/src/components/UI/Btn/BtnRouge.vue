<template>
    <button id="btnrouge" v-on="$listeners">
      <slot>{{ label }}</slot>
    </button>
</template>

<script>

export default {
  name: 'BtnRouge',
  props:{
    label:{type: String, required:true},
  }
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";


  #btnrouge{
      background-color:$groupomania_rouge;
  }
</style>