<template>
    <div id="cartouchePost">
        <p>De quoi souhaitez vous parler aujourd'hui ?</p>
        <div class="post">
            <form class="post-form" enctype="multipart/form-data">
                <div class="closePost"><a href="#" id="closePost"><img src="../assets/close.svg"/></a></div>
                <input class="titrepost" placeholder="Titre" type="text" v-model="title">
                <textarea class="contentpost" placeholder="écrivez-ici" type="text" v-model="content"/>
                <div class="align-boutons">
                    <input class="inputPost" type="file" @change="onFileSelected"/>
                    <BtnRouge @click.prevent="poster()"  label="Envoyer"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import Service from '@/services/service.js'


export default {
    name: 'EncartPost',
    components: {
        BtnRouge,
    },

    props: {
        userConnected: {
            type: Object
        }
    },

    data() {
        return {
            content: "",
            title: "",
            selectedFile: null
        }
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },


        async poster() {
            let fd = new FormData()
            if (this.selectedFile !== null) {
            fd.append('image', this.selectedFile, this.selectedFile.name)
            }
            fd.append('UserId', this.userConnected.id)
            fd.append('title', this.title)
            fd.append('content', this.content)
            await Service.postMessage(fd)
                .then(function (response) {
                    let LikeDefault = {
                        UserId: response.data.data.UserId,
                        MessageId: response.data.data.id,
                        like: 0,
                    } 
                    Service.postFirstLike(response.data.data.id, LikeDefault)
                        .then(function () {
                        window.location.href = '/main'
                        })
                })
        },
    },
}


</script>

<style lang="scss">

@import "../sass/main.scss";


#cartouchePost {
    padding: 2%;
    background-color: $blanc;

    @include tablette_ecran {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 0;
        padding: 0;
        background-color: $gris1;
    }

    p {
        color: $gris3;
        font-size: 1.3rem;
        font-weight: 300;
        text-align: left;
        margin-top: 3%;

        @include tablette_ecran {
            margin-top: 0;
            font-size: 1rem;
        }
    }

    .post {
        background-color: $gris1;
        margin-top: 2%;
        padding: 4% 4% 4% 4%;
        text-align: center;

        @include tablette_ecran {
            background-color: $blanc;
            height: 180px;
            padding: 2% 2% 2% 2%;
            text-align: right;
        }
    }

    .post-form {
        width: 100%;

        @include tablette_ecran {
            height: 150px;
        }

        .closePost {
            width: 5%;
            margin-left: 95%;
        }

        .contentpost {
            height: 95px;
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;
            margin-bottom: 3%;
            overflow: auto;

            @include tablette_ecran {
                height: 80px;
                background-color: $blanc;
                text-align: left;
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        .titrepost {
            height: 30px;
            border: none;
            color: $gris3;
            width: 100%;
            margin-top: 3%;

            @include tablette_ecran {
                height: 40px;
                background-color: $blanc;
                text-align: left;
                margin-top: 0;
            }
        }
    }

    .align-boutons {
        @include tablette_ecran {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
    }
}

</style>