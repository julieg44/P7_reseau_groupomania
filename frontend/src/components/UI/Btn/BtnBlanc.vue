<template>
    <button class="btnBlanc" v-on="$listeners">
        <slot name="plus">+</slot>
        <slot name="text"> {{label}}</slot>
    </button>
</template>

<script>

export default {
  name: 'BtnBlanc',
  props:{
    label:{type:String, required:true}
    },
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";

  .btnBlanc{
    background-color: $blanc;
    color:$groupomania_rouge;
    font-weight: 400;
    border: solid 1px $groupomania_rouge;
    .plus{
        font-size: 3rem;
    }
    @include tablette_ecran{
        width: 25%;
    }
}


</style>