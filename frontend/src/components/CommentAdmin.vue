<template>
    <div class="unCommentaire">
        <div class="case">
            <p>{{ content }}</p>
        </div>
        <div class="suppression" @click="supComment()">
            <span class="trashIcon"><img src="../assets/trash.svg"/></span><p>Supprimer ce commentaire</p>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src

import moment from 'moment';
import Service from '@/services/service.js'


export default {
    name: 'CommentAdmin',

    props: {
        content: {
            type: String
        },
        idComment: {
            type: Number
        },
    },

    filters: {
        formatedDate: function (value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    },

    methods: {
        supComment() {
            Service.supComment(this.idComment)
            .then(()=>{
            window.location.href = '/main'
            })
        }
    },

}


</script>

<style lang="scss">@import "../sass/main.scss";

.unCommentaire {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: left;

    .case {
        width: 25%;
        font-size: 0.7rem;
        text-align: left;

        @include tablette_ecran {
            font-size: 1rem;
            width: 75%;

        }
    }
}

</style>