<template>
    <div id='align'>
        <p class="nbr">{{ decompteLikes }}</p>
        <div id="like" v-if="aVotedislike === false" @click="addLike()"></div>
        <div id="likeGris" v-else></div>
        <p class="nbr">{{ decompteDislikes }}</p>
        <div id="dislike" v-if="aVotelike === false" @click="addDislike()"></div>
        <div id="dislikeGris" v-else></div>
        <!-- <p class="nbr">{{ tata }}</p>
        <div id="bulle"></div> -->
    </div>
</template>


<script>
// @ is an alias to /src

// import Service from '@/services/service.js'


const axios = require('axios');
let urlApi = "http://localhost:3000";

export default {
  name: 'Likes',

  props:{


    MessageId:{
        type:Number
    },
    UserLikeId:{
        type:Number
    },
    userConnected: { 
        type: Object 
        },

    decompteLikes:{
        type:Number
    },
    decompteDislikes:{
        type:Number
    },
    aVotelike:{
        type:Boolean
    },
    aVotedislike:{
        type:Boolean
    },
  },

  data(){
      return {
          notVote:true,
      }
  },


  computed: {
   
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

     implementeLike(){
        return this.decompteLikes ++
      }, 

      decrementeLike(){
      return this.toto -- 
      },

      decrementeDislike(){
      return this.tata -- 
      },
      implementeDislike(){
          return this.tata ++
      },





       addLike() {
           if (this.aVotelike === true) {
            this.decompteLikes--
            this.aVotelike = false
               axios.delete(urlApi + '/api/like/message/' + this.MessageId + '/' + this.userConnected.id + '/like')
           } else {
               this.decompteLikes++
               this.aVotelike = true
               axios.post(urlApi + '/api/like/message/' + this.MessageId, {
                   UserId: this.userConnected.id,
                   MessageId: this.MessageId,
                   like: 1
               })
            //    window.location.href = '/main'
           }
       },


        addDislike() {
            if (this.aVotedislike === true) {
                this.decompteDislikes--
                this.aVotedislike = false
                axios.delete(urlApi + '/api/like/message/' + this.MessageId + '/' + this.userConnected.id + '/dislike')
            } else {
                this.decompteDislikes++
                this.aVotedislike = true

                axios.post(urlApi + '/api/like/message/' + this.MessageId, {
                    UserId: this.userConnected.id,
                    MessageId: this.MessageId,
                    like: -1
                })
                // window.location.href = '/main'
            }
        }
       

    //           addLike() {
    //        if (this.userLikes.id.includes(this.userConnected.id)){
    //            this.decrementeLike ()
    //         //    this.toto = this.toto --
    //         //    this.decrementeLike()
    //            let id = this.userConnected.id
    //            console.log(id)
    //         //    this.decrementeLike()
    //         //    this.supTableauAdd() 
    //         this.userLikes.id = this.userLikes.id.filter(function(Id){
    //             return Id !== id
    //             });      
    //            axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
    //                UserId: this.userConnected.id,
    //                MessageId: this.MessageId,
    //                like: 0
    //            })
    
    //        } else {
    //         //    this.toto = this.toto ++
    //            this.implementeLike()
    //            this.userLikes.id.push(this.userConnected.id)
    //            axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
    //                UserId: this.userConnected.id,
    //                MessageId: this.MessageId,
    //                like: 1
    //            })
    //        }
    //    },



    //    addDislike() {
    //        if (this.userDislikes.id.includes(this.userConnected.id)) {
    //            this.decrementeDislike()
    //            let id = this.userConnected.id
    //            this.userDislikes.id = this.userLikes.id.filter(function(Id){
    //             return Id !== id
    //             });
    //            axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
    //                UserId: this.userConnected.id,
    //                MessageId: this.MessageId,
    //                like: 0
    //            }) 
               
               
    //        } else {
    //            this.implementeDislike()
    //            this.userDislikes.id.push(this.userConnected.id)
    //            axios.post(urlApi + '/api/like/message/' + this.MessageId + '/add', {
    //                UserId: this.userConnected.id,
    //                MessageId: this.MessageId,
    //                like: -1
    //            })
    //        }
    //     }

}
}


</script>

<style lang="scss">@import "../sass/main.scss";

#align{
    display: flex;
    flex-direction: row;
    margin-top: 8%;
    margin-bottom: 8%;
    height: 17px;
    @include tablette_ecran{
        width: 20%;
    }
    .nbr    {
        font-weight: 700;
        margin-right: 0.5%;
        font-size: $textpetit;
    }
    #like{
        margin-right: 5%;
        width: 10%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #likeGris{
        margin-right: 5%;
        width: 10%;
        background-color: $gris1;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }

    #dislike{
        margin-right: 5%;
        width: 10%;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_down.svg);
        mask: url(../assets/thumbs_down.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    #dislikeGris{
        margin-right: 5%;
        width: 10%;
        background-color: $gris1;
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
        #like, #dislike, 
        #likeGris, #dislikeGris{
            width: 10%;
            margin-right: 15%;
        }
        #nbr{
            font-size: 0.6rem;
        }
    }
}

</style>