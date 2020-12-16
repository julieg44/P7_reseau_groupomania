<template>
  <div>
    <!-- <PopAlert /> -->
    <header>
      <Header />
    </header>
    <section id="section-user">
      <div id='content-user'>
        <EncartProfil />
        <div id="content-post">
          <EncartBienvenue />
          <EncartPost />
        </div>
      </div>
    </section>


    <!--messages -->
    <section id="filPost" v-if="messages">
      <Post v-for="item in messages" 
      :title="item.title" 
      :createdAt="item.createdAt" 
      :content="item.content"
      :attachment="item.attachment"
      :key="item.blabla" />
    </section>



  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
// import PopAlert from '@/components/PopAlert.vue'
import EncartProfil from '@/components/EncartProfil.vue'
import EncartBienvenue from '@/components/EncartBienvenue.vue'
import EncartPost from '@/components/EncartPost.vue'
import Post from '@/components/Post.vue'

import { mapActions } from 'vuex';


export default {
  name: 'Main',
  components: {
    Header, EncartProfil, EncartPost , EncartBienvenue, Post
  },
  data() {
    return {
      messages: null
    }
  },
  
     methods: {

       ...mapActions(['loadMessages']),

       async loadMessages() {
           let messages = await this.$store.dispatch('loadMessages')
               .then(function (response) {
                   console.log(response)
                   return response;
               })
           return this.messages = messages;
       }

   },

    created() {
        this.loadMessages()
        console.log(this.messages)
    },
}
</script>

<style lang="scss">

@import "../sass/main.scss";



#section-user{
  // position: fixed;
  // width: 100%;
  // z-index: 10;
  background-color: $blanc;
  padding-top: 3%;
  padding-bottom: 3%;
  @include tablette_ecran{ 
    background-color: $gris1;
  }
}

#content-user{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position:relative;
    @include tablette_ecran{
    display: flex;
    flex-direction: row;
    max-width: 980px;
    margin: auto;
    align-items: initial;
  }
}
#content-post{
  position: absolute;
  @include tablette_ecran{ 
    position: relative;
    flex-direction: column;
    margin: auto;
    align-items: initial;
    display: flex;
    width: 75%;
  }
}


#content-user{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position:relative;
    @include tablette_ecran{
    display: flex;
    flex-direction: row;
    max-width: 980px;
    margin: auto;
    align-items: initial;
  }
}

#filPost {
  @include tablette_ecran{
            max-width: 980px;
        margin: auto;
  }
}

</style>