<template>
    <div class="notification"></div>
</template>

<script>

export default {
  name: 'Notif',
}
</script>

<style lang="scss">

@import "../../sass/variables.scss";
@import "../../sass/button.scss";





            .notification {
                width: 21%;
                background-color: $groupomania_rouge;
                -webkit-mask: url(../../assets/bell.svg);
                mask: url(../../assets/bell.svg);
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: 100%;
            }
</style>