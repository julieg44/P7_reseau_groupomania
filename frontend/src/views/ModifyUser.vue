<template>
    <div>
        <Entete />
        <section class="account">
            <div class='content'>
                <h1> Modifier votre compte</h1>
                <div class="createAccount">
                    <form class="createUser" enctype="multipart/form-data">
                        <div class="formText">
                            <div class="creationUsername"><label>Votre nom d'utilisateur</label><input class="inputtext"
                                    type="text" v-model="username"></div>
                            <div class="creationEmail"><label>Votre email</label><input class="inputemail" type="email"
                                    v-model="email"></div>
                        </div>
                        <div class="formImg">
                            <img src="../assets/avatar.jpg" alt="avatar" />
                            <input class="inputfile" type="file" name="photo" @change="onFileSelected" />
                            <div class="supPhoto" @click="supPhoto()">
                                <p>Supprimer la photo</p>
                            </div>
                        </div>
                    </form>
                    <router-link :to="_goBack">
                        <BtnBleu label="Annuler" />
                    </router-link><span id="retour-mobile"><br></span>
                    <BtnRouge @click.prevent="modifyUser()" label="Modifier" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Entete from '@/components/Entete.vue'
import BtnRouge from '@/components/UI/Btn/BtnRouge.vue'
import BtnBleu from '@/components/UI/Btn/BtnBleu.vue'
import Service from '@/services/service.js'


import { mapState } from "vuex";


export default {
    name: 'ModifyUser',
    components: {
        Entete,
        BtnRouge,
        BtnBleu
    },

    computed: {
        ...mapState({
            users: "users",
            selectedUser: "selectedUser",
            token: "token",
        }),
        _goBack() {
            return '/main';
        }
    },

    data() {
        return {
            username: "",
            email: "",
            password: "",
            photo: "",
            selectedFile: null,
            user: null
        }
    },
    methods: {

        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },

        supPhoto() {
            Service.supPhotoUser(this.selectedUser)
            window.location.href = '/main';
        },

        modifyUser() {
            if (this.username === "") {
                this.username = this.user.username
            }
            if (this.email === "") {
                this.email = this.user.email
            }
            const fd = new FormData()
            if (this.selectedFile !== null) {
                fd.append('image', this.selectedFile, this.selectedFile.name)
            }
            fd.append('username', this.username)
            fd.append('email', this.email)

            Service.putUser(this.selectedUser, fd)
            window.location.href = '/main'
        },
    },

    created() {
        Service.getUser(this.selectedUser)
            .then(response => {
                this.user = response.data
            })
    },
}


</script>

<style lang="scss">

@import "../sass/main.scss";

</style>