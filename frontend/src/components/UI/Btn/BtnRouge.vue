<template>
    <button class="boutonrouge" v-on="$listeners">
      <slot>{{ label }}</slot>
    </button>
</template>

<script>

export default {
  name: 'BtnRouge',
  props:{
    label:{type:String, required:true}
    },
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";


  .boutonrouge{
      background-color: $groupomania_rouge;

      @include tablette_ecran{
          margin-top: 0;
          margin-bottom: 0;
          margin-left: 3%;
      }
  }
</style>