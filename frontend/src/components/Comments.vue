<template>
    <div class="ligne-comment">
        <div class="positionPhoto">
            <img v-if="userCommentaire.photo !== null" :src="userCommentaire.photo" />
            <img v-else src="../assets/avatar.png"/>
        </div>
        <h1 class="username"> {{ userCommentaire.username }}</h1>
        <p> {{ content }}</p>
    </div>
</template>


<script>
// @ is an alias to /src

export default {
    name: 'Comments',


    props: {

        content: {
            type: String,
        },

        userCommentaire: {
            type: Object
        }
    },

}


</script>

<style lang="scss">@import "../sass/main.scss";


.ligne-comment {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2%;

    .positionPhoto {
        width: 11%;
        text-align: left;
        margin-right: 2%;

        @include tablette {
            width: 6%;
            margin-right: 2%;
        }

        @include ecran {
            width: 6%;
            margin-right: 2%;
        }

        img {
            width: 100%;
            height: 30px;
            clip-path: ellipse(50% 50%);

            @include tablette {
                margin-right: 5%;
                height: 30px;
            }

            @include ecran {
                margin-right: 5%;
                height: 40px;
            }

        }
    }


    .username {
        font-size: 0.7rem;
        text-align: left;
        font-weight: 700;
        margin-bottom: 0;
        margin-right: 2%;

        @include tablette_ecran {
            font-size: 0.9rem;
            text-align: left;
            font-weight: 700;
            margin-right: 1%;
        }
    }

    p {
        text-align: left;
        font-size: 0.7rem;

        @include tablette_ecran {
            font-size: 0.9rem;
        }
    }
}

</style>