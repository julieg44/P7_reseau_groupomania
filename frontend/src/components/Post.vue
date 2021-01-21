<template>
        <div id="message">
            <div class="message-top">
                <div class="positionPhoto">
                    <img v-if="user.photo !== null" :src="user.photo" />
                    <img v-else src="../assets/avatar.png"/>
                </div>
                <h1 class="usernamePost">{{ user.username }}</h1>
                <p class="date"> {{ createdAt | formatedDate }}</p>     
            </div> 
            <h2 id="title">{{ title }}</h2>
            <div class="attachment-post">
                <img class="image-post" v-if="attachment" :src="attachment"/>
            </div>
            <p class="contenuComment">{{ content }}</p> 
            <div class="message-bottom">
                <Likes :decompteLikes="decompteLikes"  
                :decompteDislikes="decompteDislikes" 
                :userConnected="userConnected" 
                :MessageId="id" 
                :aVotelike="aVotelike"
                :aVotedislike="aVotedislike"
                />
                <BtnSup v-if="proprietaireMessage" @click="supMessage()"/>
            </div>
            <Comments v-for="item in commentaires" 
            :content="item.content" 
            :UserId="item.UserId"
            :MessageId="item.MessageId"
            :key="item.id"
            :userCommentaire="item.User"
            />
            <AddComment :MessageId="id" :UserId="UserId" :userConnected="userConnected" />
        </div>
</template>




<script>

import moment from 'moment';
import Comments from '@/components/Comments.vue'
import Likes from '@/components/Likes.vue'
import AddComment from '@/components/AddComment.vue'
import BtnSup from '@/components/UI/Btn/BtnSup.vue'
import Service from '@/services/service.js'


export default {
    name: 'Post',
    components: {
        Comments,
        Likes,
        AddComment,
        BtnSup
    },

    props: {

        id: {
            type: Number,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        createdAt: {
            type: String,
        },
        attachment: {
            type: String,
        },
        UserId: {
            type: Number,
        },
        user: {
            type: Object
        },
        userConnected: {
            type: Object
        },
    },


    data() {
        return {
            commentaires: null,
            decompteLikes: null,
            aVotelike: false,
            aVotedislike: false,
            decompteDislikes: null,
            proprietaireMessage: null
        }
    },



    filters: {
        formatedDate: function (value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    },

    methods: {
        supMessage() {
            Service.supMessage(this.id)
            .then(() => {
            window.location.href = '/main'
            })
        },
    },

    beforeMounted() {
        this.userConnected
    },

    created() {
        Service.getComments(this.id)
            .then(response => {
                this.commentaires = response.data
            })

        Service.getLike(this.id)
            .then(response => {

                this.decompteLikes = response.data.length
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].UserId === this.userConnected.id && response.data[i].like === 1) {
                        return this.aVotelike = true
                    }
                }
            })
        Service.getDislike(this.id)
            .then(response => {
                this.likeId = response.data
                this.decompteDislikes = response.data.length
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].UserId === this.userConnected.id && response.data[i].dislike === 1) {
                        return this.aVotedislike = true
                    }
                }
            })
    },

    updated() {
        if (this.userConnected.id === this.UserId) {
            return this.proprietaireMessage = true
        } else {
            return this.proprietaireMessage = false
        }
    },

}


</script>

<style lang="scss">@import "../sass/variables.scss";


#message {
    width: 95%;
    margin: auto;
    background-color: $groupomania_bleu_clair;
    padding: 3%;
    margin-top: 5%;
    z-index: 0;

    @include tablette_ecran {
        width: 80%;
        padding: 4%;
    }

    .message-top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5%;

        .positionPhoto {
            width: 20%;
            text-align: left;
            margin-right: 2%;

            @include tablette {
                width: 11%;
                margin-right: 2%;
            }

            @include ecran {
                width: 8%;
                margin-right: 2%;
            }

            img {
                width: 100%;
                height: 38px;
                clip-path: ellipse(50% 50%);

                @include tablette_ecran {
                    margin-right: 5%;
                    height: 48px;
                }
            }
        }

        .usernamePost {
            font-size: $textpetit;
            text-align: left;
            font-weight: 700;
            text-decoration: underline;
            margin-bottom: 0;
            width: 80%;
            color: $groupomania_bleu;

            @include tablette {
                font-size: 1rem;
            }

            @include ecran {
                font-size: 1rem;
            }
        }

        .date {
            text-align: right;
            width: 50%;
            font-size: 0.7rem;

            @include tablette_ecran {
                font-size: 0.9rem;
                width: 30%;
            }
        }
    }

    .attachment-post {
        width: 80%;
        margin: auto;

        .image-post {
            width: 100%;
        }
    }

    .contenuComment {
        font-size: $textpetit;
        text-align: justify;
        margin-top: 4%;
        margin-bottom: 4%;
    }

    #title {
        font-size: $textpetit;
        text-align: center;
        font-weight: 700;
        margin-bottom: 2%;
        color: $groupomania_bleu;

        @include tablette {
            font-size: 1rem;
        }

        @include ecran {
            font-size: 1rem;
            margin-bottom: 2%;
        }
    }

    .message-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        margin-top: 8%;
        margin-bottom: 8%;

        @include tablette_ecran {
            margin-top: 3%;
            margin-bottom: 3%;
        }
    }
}

.button-user {
    background-color: $groupomania_bleu_clair;
    width: 12%;
    margin: 0;

    @include tablette {
        background-color: none;
        width: 7%;
    }

    @include ecran {
        background-color: none;
        width: 5%;
    }

    .destroy-icon {
        background-color: $groupomania_bleu;
        width: 85%;
        height: 30px;
    }
}

</style>