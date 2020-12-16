<template>
    <button class="button-user" v-on="$listeners">
        <div id="deconnect-icon"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnDeconnect',
}
</script>

<style lang="scss">

@import "../../../sass/variables.scss";
@import "../../../sass/button.scss";

#deconnect-icon {

    width: 65%;
    height: 25px;
    background-color: $groupomania_rouge;
    mask: url(../../../assets/power_off.svg);
    -webkit-mask: url(../../../assets/power_off.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
        @include tablette_ecran{
        width: 50%;
        height: 25px;
        background-color: $groupomania_rouge;
    }
}

</style>