<template>
    <button class="button-user" v-on="$listeners">
        <div class="deconnect-icon"></div>
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

.deconnect-icon {
    width: 65%;
    height: 35px;
    background-color: $groupomania_rouge;
    mask: url(../../../assets/power_off.svg);
    -webkit-mask: url(../../../assets/power_off.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
        @include tablette_ecran{
        width: 50%;
        background-color: $groupomania_rouge;
    }
}

</style>