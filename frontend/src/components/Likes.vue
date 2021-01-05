<template>
    <div id='align'>
        <p class="nbr">{{ toto }}</p>
        <div id="like" v-show="notVote" @click="addLike()"></div>
        <p class="nbr">{{ tata }}</p>
        <div id="dislike" @click="addDislike()"></div>
        <p class="nbr">{{ tata }}</p>
        <div id="bulle"></div>
    </div>
</template>


<script>
// @ is an alias to /src

const axios = require('axios');
let urlApi = "http://localhost:3000";

export default {
  name: 'Likes',

  props:{
      tata:{
        type:Number
    },
    toto:{
        type:Number,
    },
    MessageId:{
        type:Number
    },
    userConnected: { 
        type: Object 
        },

    userDislikes:{
        type: Object
    },
    userLikes:{
        type: Object
    },
    // DecompteLike:{
    //     type:Array
    // },
  },

  data(){
      return {
          notVote:true
      }
  },
  components: {

  },

  watch: {
//  decrementeLike(){
//       return this.toto -- 
//       },
//       implementeLike(){
//           return this.toto ++
//       },
//       decrementeDislike(){
//       return this.tata -- 
//       },
//       implementeDislike(){
//           return this.tata ++
//       },
    
  },

   methods: {

      decrementeLike(){
      return this.toto -- 
      },
      implementeLike(){
          return this.toto ++
      },
      decrementeDislike(){
      return this.tata -- 
      },
      implementeDislike(){
          return this.tata ++
      },





       addLike() {
           if (this.userLikes.id.includes(this.userConnected.id)){
               this.decrementeLike ()
            //    this.toto = this.toto --
            //    this.decrementeLike()
               let id = this.userConnected.id
               console.log(id)
            //    this.decrementeLike()
            //    this.supTableauAdd() 
            this.userLikes.id = this.userLikes.id.filter(function(Id){
                return Id !== id
                });      
               axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
                   UserId: this.userConnected.id,
                   MessageId: this.MessageId,
                   like: 0
               })
    
           } else {
            //    this.toto = this.toto ++
               this.implementeLike()
               this.userLikes.id.push(this.userConnected.id)
               axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
                   UserId: this.userConnected.id,
                   MessageId: this.MessageId,
                   like: 1
               })
           }
        
                        // window.location.href = '/main'

       },
       addDislike() {
           if (this.userDislikes.id.includes(this.userConnected.id)) {
               this.decrementeDislike()
               let id = this.userConnected.id
               this.userDislikes.id = this.userLikes.id.filter(function(Id){
                return Id !== id
                });
               axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
                   UserId: this.userConnected.id,
                   MessageId: this.MessageId,
                   like: 0
               }) 
               
               
           } else {
               this.implementeDislike()
               this.userDislikes.id.push(this.userConnected.id)
               axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
                   UserId: this.userConnected.id,
                   MessageId: this.MessageId,
                   like: -1
               })
           }
                                //    window.location.href = '/main'

       }

   },

    created(){

  },
}


</script>

<style lang="scss">@import "../sass/main.scss";

#align{
    display: flex;
    flex-direction: row;
    margin-top: 8%;
    margin-bottom: 8%;
    height: 17px;
    .nbr    {
        font-weight: 700;
        margin-right: 0.5%;
        font-size: $textpetit;
    }
    #like{
        margin-right: 5%;
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #dislike{
        margin-right: 5%;
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_down.svg);
        mask: url(../assets/thumbs_down.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #bulle{
        width: 4%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/bulle.svg);
        mask: url(../assets/bulle.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    @include tablette_ecran{
        margin-top: 2%;
        margin-bottom: 2%;
        height: 17px;
        #like, #dislike, #bulle{
            width: 2%;
            margin-right: 3%;
        }
        #nbr{
            font-size: 0.6rem;
        }
    }
}

</style>