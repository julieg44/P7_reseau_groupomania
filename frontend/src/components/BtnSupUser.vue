<template>
    <button id="destroy" v-on="$listeners">
        <div class="destroy"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnSupUser',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

    #destroy{
      background-color: $blanc;
    }
    .destroy {
        width: 45%;
        height: 25px;
        // margin-right: 12%;
        background-color: $groupomania_rouge;
        -webkit-mask: url(../assets/trash.svg);
        mask: url(../assets/trash.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
</style>