<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>! Yo te Ayudo !</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="false">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div>
              <img src="./../../public/assets/img/logo3.png" alt="Logo 3" />
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
              <img class="foto0" src="./../../public/assets/portada/fot1.jpeg" alt="foto 1" />
          </ion-col>
          <ion-col>
              <a href="/principales/derivacion">
                <img class="foto0" src="./../../public/assets/portada/fot3.jpeg" alt="foto 2" />
              </a>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <img class="foto0" src="./../../public/assets/portada/fot2.jpeg" alt="foto 3" />
          </ion-col>
          <ion-col>
            <img class="foto0" src="./../../public/assets/portada/fot4.jpeg" alt="foto 4" />
          </ion-col>
        </ion-row>
        <ion-row v-show="!globalLogged" responsive-sm class="ion-padding">
          <ion-col>
            <ion-label><p>Si ya tienes cuenta directamente puedes</p></ion-label>
            <ion-button
              @click="onLogin"
              color="danger"
              expand="block"
              >Ingresar</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { computed, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonRow,
  IonCol,
  IonInput,
  IonToast, IonLabel, IonGrid
} from "@ionic/vue";

import { useStore } from 'vuex';
const store = useStore();
const globalLogged = ref(store.state.globalLogged);

import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref("");
const password = ref("");
const submitted = ref(false);

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
  () => username.value.trim() !== "" && password.value.trim() !== ""
);

const onLogin = () => {
  submitted.value = true;
  if (usernameValid && passwordValid) {
  }

  router.push('/login');
};

const onSignup = () => {
  toastMessage.value = "Successfully logged in!";

  showToast.value = true;

  username.value = "";
  password.value = "";
};
</script>


<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}

.foto0 {
  /*height: 100px;*/
  width: 120px;
  border-radius: 20px;
  position: "absolute";
  top: 10px;
  transform: translateX(0px) translateY(0px) rotate(-9deg);
}

.foto1 {
  /*height: 100px;*/
  width: 180px;
  border-radius: 20px;
  position: "absolute";
  top: 10px;
  transform: translateX(10px) translateY(10px) rotate(-5deg);
}

.foto3 {
  width: 270px;
  /*height: 100px;*/
  border-radius: 20px;
  position: absolute;
  /*top: 100px;
  left: 180px;*/
  transform: translateX(20px) translateY(20px) rotate(15deg);
}


.foto2 {
  height: 130px;
  /*width: 130px;*/
  border-radius: 20px;
  position: "absolute";
  /*top: 180px;
  left: 70px;*/
  transform: translateX(-150px) translateY(250px) rotate(-5deg); 
}

.foto4 {
  height: 200px;
  width: 200px;
  border-radius: 20px;
  position: absolute;
  /*top: -400px;
  left: 100px;*/
  transform: translateX(-100px) translateY(300px) rotate(-15deg);
}
</style>
