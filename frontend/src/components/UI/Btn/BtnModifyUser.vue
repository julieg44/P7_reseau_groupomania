<template>
    <button class="button-user" v-on="$listeners">
        <div id="modif-icon"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnModifyUser',
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";

#modif-icon {

  width: 75%;
  height: 25px;
  background-color: $groupomania_rouge;
  mask: url(../../../assets/user_edit.svg);
  -webkit-mask: url(../../../assets/user_edit.svg);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100%;

  @include tablette_ecran {
    width: 62%;
    background-color: $groupomania_rouge;
  }
}

</style>