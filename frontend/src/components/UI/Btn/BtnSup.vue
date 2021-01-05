<template>
    <button class="button-user" v-on="$listeners">
        <div id="destroy-icon"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnSup',
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";

#destroy-icon {
  width: 55%;
  height: 25px;
  background-color: $groupomania_rouge;
  -webkit-mask: url(../../../assets/trash.svg);
  mask: url(../../../assets/trash.svg);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100%;

  @include tablette_ecran {
    width: 45%;
    background-color: $groupomania_rouge;
  }
}

    
</style>