<template>
    <div id="cartouchePost">
        <p>De quoi souhaitez vous parler aujourd'hui ?</p>
        <div id="post">
            <div class="closePost"><a href="#" id="closePost">X</a></div>
            <input placeholder="écrivez-ici" type="text">
            <div>
                <BtnAddMedia />
                <BtnPost />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import BtnPost from '@/components/BtnPost.vue'
import BtnAddMedia from '@/components/BtnAddMedia.vue'
import { mapState } from "vuex";
import { mapActions } from 'vuex';



export default {
  name: 'EncartPost',
  components: {
    BtnPost, 
    BtnAddMedia,
  },
  data(){
      return {
          user : null
      }
  },

  computed: {
    ...mapState ({
    users: "users",
    selectedUser: "selectedUser",
    token: "token",
    }),  
  },


   methods: {
   ...mapActions (['supUser', 'deconnect', 'modifyUser']),

  },
}
</script>

<style lang="scss">

@import "../sass/main.scss";


#cartouchePost {
    p {
        color: $gris3;
        font-size: 1rem;
        font-weight: 300;
        text-align: left;
        margin-top: 3%;
    }

    #post {
        background-color: $gris1;
        margin-top: 2%;
        padding: 4% 4% 4% 4%;
        text-align: right;
    }

    input {
        border: none;
        color: $gris2;
        width: 100%;
        height: 95px;
        margin-top: 3%;
    }

    @include tablette_ecran {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 0;

        p {
            margin-top: 0;
        }

        .post-icon {
            display: none;
        }

        #post {
            background-color: $blanc;
            margin-top: 2%;
            height: 250px;
            padding: 2% 2% 2% 2%;
            text-align: right;
        }

        input {
            border: none;
            color: $gris2;
            width: 100%;
            height: 70%;
        }
    }
}

</style>