<template>
    <button id="modif" v-on="$listeners">
        <div class="modif"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnModifyUser',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

    #modif{
      background-color:$blanc;
    }

    .modif {
        width: 62%;
        height: 25px;
        // margin-right: 12%;
        background-color: $groupomania_rouge;
        mask: url(../assets/user_edit.svg);
        -webkit-mask: url(../assets/user_edit.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;

    }

</style>