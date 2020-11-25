<template>
  <div>
    <PopAlert/>
    <header>
      <Header/>
    </header>
    <!-- Mobile -->
    <UserMobile/>

    <!-- desktop -->

    <UserDesktop/>

<!--messages -->
    <section id="message">

    </section>

  </div>  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import PopAlert from '@/components/PopAlert.vue'
import UserDesktop from '@/components/UserDesktop.vue'
import UserMobile from '@/components/UserMobile.vue'


export default {
  name: 'Main',
  components: {
    Header, PopAlert, UserDesktop, UserMobile
  }
}
</script>

<style lang="scss">

@import "../sass/main.scss";
#message{
    background-color: $blanc;
    height: 980px;
    margin-top: -80%;
    @include tablette_ecran{
        display: none;
    }
}