<template>
    <button id="deconnect" v-on="$listeners">
        <div class="deconnect"></div>
    </button>
</template>

<script>
export default {
  name: 'BtnDeconnect',
}
</script>

<style lang="scss">

@import "../sass/main.scss";

#deconnect{
  background-color: $blanc;
}

.deconnect {
    width: 50%;
    height: 25px;
    background-color: $groupomania_rouge;
    mask: url(../assets/power_off.svg);
    -webkit-mask: url(../assets/power_off.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
}

</style>