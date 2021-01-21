<template>
    <div id="contentAdmin">
        <div id="blocUtilisateurs">
            <h2 class="titleAdmin">Liste des {{ nbrUser }} utilisateurs</h2>
            <div class="listeEntete">
                <div class="case"><p>Nom</p></div> 
                <div class="case"><p>Email</p></div> 
                <div class="case date"><p>Date de création</p></div>
            </div>
            <User v-for="item in listeUser"
            :username="item.username"
            :creation="item.createdAt"
            :email="item.email"
            :idUser="item.id"
            :key="item.id"/>
        </div>
        <div class="pagination">
            <div v-if="nbrPagesUser > 1" class="num" @click="userPage(1)"><p>1</p></div>
            <div v-if="nbrPagesUser >= 2" class="num" @click="userPage(2)"><p>2</p></div>
            <div v-if="nbrPagesUser >= 3" class="num" @click="userPage(3)"><p>3</p></div>
        </div>
        <div id="blocMessages">
            <h2 class="titleAdmin">Liste des {{ nbrMessage }} messages</h2>
            <div class="listeEntete">
                <div class="case"><p>Nom</p></div> 
                <div class="case"><p>Contenu</p></div> 
                <div class="case date"><p>Date de création</p></div>
            </div>
            <Messages v-for="item in listeMessage"
            :content="item.content"
            :creation="item.createdAt"
            :userUsername="item.User.username"
            :idMessage="item.id"
            :commentaire="item.Comments"
            :key="item.id"/>
        </div>
        <div class="pagination">
            <div v-if="nbrPagesMessages > 1" class="num" @click="messagePage(1)"><p>1</p></div>
            <div v-if="nbrPagesMessages >= 2" class="num" @click="messagePage(2)"><p>2</p></div>
            <div v-if="nbrPagesMessages >= 3" class="num" @click="messagePage(3)"><p>3</p></div>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src

import Service from '@/services/service.js'
import User from '@/components/UserAdmin.vue'
import Messages from '@/components/MessagesAdmin.vue'


export default {
    name: 'Admin',
    components: {
        User,
        Messages
    },

    data() {
        return {
            listeUser: null,
            listeMessage: null,
            nbrMessage: null,
            nbrUser: null,
            nbrPagesMessages: null,
            nbrPagesUser: null
        }
    },

    methods: {
        userPage(params) {
            Service.getAllUsersAdmin(params)
                .then(response => {
                    this.listeUser = response.data.result
                })
        },
        messagePage(params) {
            Service.getAllMessagesAdmin(params)
                .then(response => {
                    this.listeMessage = response.data.result
                })
        }
    },

    created() {
        Service.getAllUsersAdmin(1)
            .then(response => {
                console.log(response)
                this.listeUser = response.data.result
                this.nbrUser = response.data.count
                this.nbrPagesUser = response.data.pages
            })
        Service.getAllMessagesAdmin(1)
            .then(response => {
                this.listeMessage = response.data.result
                this.nbrMessage = response.data.count
                this.nbrPagesMessages = response.data.pages
            })
    },
}

</script>

<style lang="scss">@import "../sass/main.scss";


#contentAdmin {
    position: relative;
    max-width: 90%;
    margin: auto;

    @include tablette {
        max-width: 90%;
        margin: auto;
    }

    @include ecran {
        max-width: 980px;
        margin: auto;
    }

    .titleAdmin {
        margin-bottom: 3%;
    }

    #blocUtilisateurs {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .listeEntete {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1%;
        text-align: left;
        background-color: $groupomania_rouge;
        color: $blanc;
        font-weight: 700;

        .case {
            width: 45%;
            font-size: 0.7rem;
            text-align: left;

            @include tablette_ecran {
                font-size: 1rem;
                width: 25%;
            }
        }
    }


    .suppression {
        color: $groupomania_rouge;
        text-decoration: underline;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
        width: 10%;
        text-align: right;

        @include tablette_ecran {
            width: 25%;
        }

        p {
            display: none;

            @include tablette_ecran {
                display: block;
            }
        }

        .trashIcon {
            width: 10%;

            img {
                width: 40%;
            }

            @include tablette_ecran {
                display: none;
            }
        }
    }

    .date {
        display: none;

        @include tablette_ecran {
            display: block;
        }
    }
}

.pagination {
    width: 30%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10%;

    @include tablette {
        width: 20%;
    }

    @include ecran {
        width: 10%;
    }

    .num {
        width: 20px;
        height: 20px;
        background-color: $groupomania_bleu;
        cursor: pointer;

        p {
            color: $blanc;
        }
    }
}

</style>