<template>
    <div class="align">
        <div class="border">
        <p class="nbr">{{ decompteLikes }}</p>
        <div class="like" v-if="aVotedislike === false" @click="addLike()"></div>
        <div class="likeGris" v-else></div>
        </div>
    <div class="border">
        <p class="nbr">{{ decompteDislikes }}</p>
        <div class="dislike" v-if="aVotelike === false" @click="addDislike()"></div>
        <div class="dislikeGris" v-else></div>
    </div>
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

.align{
    display: flex;
    flex-direction: row;
    height: 17px;
    width: 50%;
    @include tablette_ecran{
align-items: center;
    }

    .border{
        border: solid 1px $groupomania_bleu;
    display: flex;
    width: 25%;
    height: 24px;
    margin-right: 7%;
    align-items: center;
    padding: 1%;
    padding-top: 3%;
    justify-content: center;
    @include tablette{
        width:16%;
        height: 27px;
    }
    @include ecran{
        width:13%;
        height: 27px;
    }
    }
    .nbr    {
        font-weight: 700;
        margin-right: 10%;
        font-size: $textpetit;
    }
    .like{
        margin-right: 5%;
        width: 50%;
    height: 20px;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    .likeGris{
        margin-right: 5%;
        width: 50%;
    height: 20px;
        background-color: $gris1;
        -webkit-mask: url(../assets/thumbs_up.svg);
        mask: url(../assets/thumbs_up.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }

    .dislike{
        margin-right: 5%;
        width: 50%;
    height: 20px;
        background-color: $groupomania_bleu;
        -webkit-mask: url(../assets/thumbs_down.svg);
        mask: url(../assets/thumbs_down.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }
    .dislikeGris{
        margin-right: 5%;
        width: 50%;
    height: 20px;
        background-color: $gris1;
        -webkit-mask: url(../assets/thumbs_down.svg);
        mask: url(../assets/thumbs_down.svg);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100%;
    }

    @include tablette_ecran{
        margin-top: 2%;
        margin-bottom: 2%;
        height: 17px;
        .like, .dislike, 
        .likeGris, .dislikeGris{
            width: 39%;
            margin-right: 15%;
        }
        // .nbr{
        //     font-size: 0.6rem;
        // }
    }
}

</style>