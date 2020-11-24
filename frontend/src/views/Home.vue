<template>
  <div>
    <PopAlert/>
    <header>
      <Header/>
    </header>
    <section id="login">
      <Login/>
    </section>
  </div>  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Login from '@/components/Login.vue'
import PopAlert from '@/components/PopAlert.vue'



export default {
  name: 'Home',
  components: {
    Header, Login, PopAlert
  }
}
</script>

<style lang="scss">

@import "../sass/main.scss";

header{
    background-color: $groupomania_bleu;
    text-align: center;
    padding: 4% 2% 2% 2%;
    @include ecran{
      padding: 1% 1% 1% 1%;
    }
}

section {
  padding-top: 10%;
  background-color: $gris1;
  height: 980px;
}
</style>
