<template>
<div class="listeUser">
<div class="case"><p>{{ username }}</p></div> 
<div class="case"><p>{{ email }}</p></div> 
<div class="case date"><p>{{ creation | formatedDate }}</p></div>
<div class="suppression" @click="supUser()"><span class="trashIcon"><img src="../assets/trash.svg"/></span><p>Supprimer ce compte</p></div>
</div>
</template>


<script>
// @ is an alias to /src

import moment from 'moment';
import Service from '@/services/service.js'



export default {
  name: 'User',
  components: {

  },


    props: {
     listeUser:{
         type:Array
     },
     username:{
         type:String
     },
     email:{
         type:String
     },
     creation:{
         type:String
     },
     idUser:{
         type:Number
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
       supUser(){
           Service.supUser(this.idUser)
           window.location.href="/main"
       }
  },

    created(){
        
  },
}


</script>

<style lang="scss">@import "../sass/main.scss";

.listeUser{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
    text-align: left;
    border-bottom: 1px solid $gris3;
        .case{
        width: 25%;
        font-size: 0.7rem;
        @include tablette_ecran{
            font-size: 1rem;
        }
    }
}

</style>