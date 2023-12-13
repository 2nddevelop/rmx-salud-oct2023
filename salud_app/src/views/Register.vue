<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Registro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="./../../public/assets/img/logo.png" width="100" alt="logo" />
      </div>
      <ion-label>
        <p>Bienvenido ! 👋</p>
        <p>Si no tiene una cuenta, este es el lugar adecuado</p>
      </ion-label>
      <form novalidate @submit.prevent="onRegister">
        <ion-list>
          <ion-item>
            <ion-input
              label="Carnet de Identidad"
              labelPlacement="floating"
              v-model="ci"
              name="ci"
              type="text"
              spellcheck="false"
              autocapitalize="on"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Nombre completo"
              labelPlacement="floating"
              v-model="nombres"
              name="nombres"
              type="text"
              spellcheck="true"
              autocapitalize="on"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Número celular de contacto"
              labelPlacement="floating"
              v-model="celular"
              name="celular"
              type="number"
              spellcheck="false"
              autocapitalize="on"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Correo electrónico"
              labelPlacement="floating"
              v-model="username"
              name="username"
              type="text"
              spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              labelPlacement="floating"
              label="Clave"
              v-model="password"
              name="password"
              type="password"
              required
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button color="primary" :disabled="!canSubmit" @click="onRegister" type="submit" expand="block"
              >Registrar</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-label><p>Si ya tienes cuenta directamente puedes</p></ion-label>
            <ion-button
              @click="onLogin"
              color="secondary"
              expand="block"
              >Ingresar</ion-button
            >
          </ion-col>
        </ion-row>
      </form>
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
  IonPage, IonHeader, IonToolbar, IonButtons,
  IonMenuButton, IonButton, IonContent, IonList,
  IonItem, IonTitle, IonRow, IonCol,
  IonInput, IonToast, IonSelect, IonSelectOption,
  IonIcon, IonFooter, IonLabel, IonBadge
} from "@ionic/vue";

import { useRouter } from 'vue-router';
const router = useRouter();

// vuex
import { useStore } from 'vuex';
const store = useStore();

const globalVar = ref(store.state.globalVar);
const globalUser = ref(store.state.globalUser);
const globalLogged = ref(store.state.globalLogged);

//const updateGlobalVar = (nuevo: any) => {
//  // Actualiza la variable global utilizando la mutación
//  store.commit('updateGlobalVar', nuevo);
//};

// login control
const ci = ref("");
const nombres = ref("");
const celular = ref("");
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

const onRegister = () => {
  submitted.value = true;
  // 777 if (usernameValid && passwordValid) {
  if (username.value.trim() != '' && password.value.trim() === 'admin') {
    store.commit('updateGlobalUser', username.value.trim());
    store.commit('updateGlobalLogged', true);
    toastMessage.value = "Satisfactoriamente ingresad@!";
    showToast.value = true;
    router.push('/home');
  }
};

const onLogin = () => {
  // toastMessage.value = "Successfully logged in!";
  // showToast.value = true;
  // 
  // username.value = "";
  // password.value = "";
  router.push('/login');
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
</style>