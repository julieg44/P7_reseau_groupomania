<template>
  <div>
    <Entete />
    <section id="login">
      <Login />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Entete from '@/components/Entete.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'Home',
  components: {
    Entete, Login
  }
}
</script>

<style lang="scss">
@import "../sass/main.scss";
#login {
  padding-top: 30%;
  background-color: $gris1;
  height: 980px;
  @include tablette{
    padding-top: 23%;
  }
  @include ecran{
    padding-top: 10%;
  }
}
</style>