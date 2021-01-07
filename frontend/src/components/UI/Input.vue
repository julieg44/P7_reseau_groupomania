<template>
<div class="search-input">
    <input class="input-search" placeholder="Rechercher par nom" type="text" v-model="searchName"/>
    <BtnRouge label="Chercher"/>
    <div class="close"></div>
</div>
</template>

<script>

import BtnRouge from '../../components/UI/Btn/BtnRouge.vue'


export default {
  name: 'Input',
  components:{
      BtnRouge
  },

  props:{
      placeholder:{
          type:String
      }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables.scss";
@import "../../sass/button.scss";

.search-input{
display: flex;
flex-direction: row;
}

.input-search {
  height: 30px;
//   background-color: $groupomania_rouge;
//   -webkit-mask: url(../../assets/search.svg);
//   mask: url(../../assets/search.svg);
//   -webkit-mask-repeat: no-repeat;
//   -webkit-mask-size: 100%;
}

.close{
    width: 20%;
    height: 30px;
    background-color: $groupomania-rouge;
    -webkit-mask: url(../../assets/close.svg);
    mask: url(../../assets/close.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
}

</style>