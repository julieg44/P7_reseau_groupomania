<template>
    <div class="explication"><slot>{{text}}</slot></div>
</template>

<script>

export default {
  name: 'Explication',

  props:{
      text:{ type:String, required:true}
  }
}




</script>

<style lang="scss">
@import "../../sass/variables.scss";

.explication {
  width: 75%;  
  font-size: 1rem; 
  margin: auto; 
  margin-top: 4%;
  padding-top: 4px;
  background-color: $blanc;
  color: $groupomania_rouge;
  border: 1px solid $groupomania_rouge;
  @include tablette{
      width: 40%;
      margin-top: 2%;
  }
  @include ecran{
      width: 20%;
      min-height: 35px;
      margin-top: 1%;
  }
}

</style>