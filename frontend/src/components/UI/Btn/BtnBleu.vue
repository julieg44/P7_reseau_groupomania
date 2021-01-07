<template>
  <button class="btnBleu" v-on="$listeners">
    <slot>{{label}}</slot>
  </button>
</template>

<script>

export default {
  name: 'BtnBleu',
  props:{
    label:{type:String, required:true}
    },
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";


  .btnBleu{
      background-color: $groupomania_bleu;
  }

  a.router-link-active {
  width: 100%;
  }

</style>