<template>
    <button class="search" v-on="$listeners">
    </button>
</template>

<script>

export default {
  name: 'Search',
}
</script>

<style lang="scss">
@import "../../sass/variables.scss";
@import "../../sass/button.scss";

.search {
  width: 21%;
  background-color: $groupomania_rouge;
  -webkit-mask: url(../../assets/search.svg);
  mask: url(../../assets/search.svg);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100%;
}

</style>