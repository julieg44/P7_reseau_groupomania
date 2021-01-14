<template>
<div class="unMessage">
    <div class="contenuMessage">
        <div class="case">
            <p>{{ userUsername }}</p>
        </div>
        <div class="case">
            <p>{{ content }}</p>
        </div>
        <div class="case date">
            <p>{{ creation | formatedDate }}</p>
        </div>
        <div class="suppression" @click="supMess()">
            <span class="trashIcon"><img src="../assets/trash.svg"/></span><p>Supprimer ce message</p>
        </div>
    </div>
    <div class="ensembleCommentaire" v-if="commentaire.length > 0">
                    <!-- <div class="listeEntete"> -->
                <div class="enteteCommentaire"><p>Commentaires</p></div> 
                <!-- <div class="case"><p>Contenu</p></div> 
                <div class="case"><p>Date de création</p></div>
            </div> -->
        <CommentAdmin  v-for="item in commentaire"
        :content="item.content"
        :idComment="item.id"
        :key="item.id"/>
    </div>
</div>

</template>


<script>
// @ is an alias to /src

import moment from 'moment';
import Service from '@/services/service.js'

import CommentAdmin from '@/components/CommentAdmin.vue'



export default {
  name: 'Messages',
  components: {
      CommentAdmin
  },


    props: {
  
     userUsername:{
         type:String
     },
     content:{
         type:String
     },
     creation:{
         type:String
     },
     idMessage:{
         type:Number
     },
     commentaire:{
         type:Array
     },
    },

    filters: {
        formatedDate: function (value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    },


  computed: {
 
  },


   methods: {
       supMess(){
            Service.supMessage(this.idMessage)
            window.location.href='/main'
       }
  },

    created(){
        
  },
}


</script>

<style lang="scss">@import "../sass/main.scss";
.unMessage{
    border: 1px solid $gris3;
    background-color: $gris0;
    margin-bottom: 3%;
    padding: 2%;
}
.contenuMessage{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1%;
    
    text-align: left;
    .case{
        width: 25%;
        font-size: 0.7rem;
        @include tablette_ecran{
            font-size: 1rem;
        }
    }

}
.enteteCommentaire{
        // display: flex;
        // flex-direction: row;
        padding: 1%;
        text-align: center;
        background-color: $gris2;
        color: $blanc;
        font-weight: 700;
        font-size: 0.7rem;
        @include tablette_ecran{
            font-size: 0.9rem;
        }
}
.ensembleCommentaire{
    margin-top: 3%;
}

</style>