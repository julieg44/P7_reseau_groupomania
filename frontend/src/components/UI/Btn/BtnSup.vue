<template>
    <button class="button-user" v-on="$listeners">
        <div class="destroy-icon"></div>
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

.destroy-icon {
  background-color: $groupomania_rouge;
  -webkit-mask: url(../../../assets/trash.svg);
  mask: url(../../../assets/trash.svg);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100%;

  @include tablette_ecran {
    background-color: $groupomania_rouge;
  }
}

    
</style>