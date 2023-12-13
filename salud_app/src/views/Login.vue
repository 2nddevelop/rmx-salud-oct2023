<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Ingreso</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="./../../public/assets/img/logo2.png" alt="logo" />
      </div>
      <ion-label>
        <p>Hola ! 👋</p>
        <p>Hola nuevamente, l@ esperamos!</p>
        <p>vmjc5767 / cs20cs1527 - erof4270 / cs20cs1159 - nesr5480 / cs20cs1351</p>
      </ion-label>
      <form novalidate @submit.prevent="onLogin">
        <ion-list>
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
            <ion-button color="primary" :disabled="!canSubmit" @click="onLogin" type="submit" expand="block"
              >Ingresar</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-label><p>Si aún no tiene cuenta?</p></ion-label>
            <ion-button
              @click="onSignup"
              color="secondary"
              expand="block"
              >Registrarse</ion-button
            >
            <ion-label><br><p>Usuario de pruebas: admin con clave: admin</p></ion-label>
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
import { useClientes } from '@/services/serviceClientes';

const store = useStore();

const globalVar = ref(store.state.globalVar);
const globalUser = ref(store.state.globalUser);
const globalLogged = ref(store.state.globalLogged);

//const updateGlobalVar = (nuevo: any) => {
//  // Actualiza la variable global utilizando la mutación
//  store.commit('updateGlobalVar', nuevo);
//};

// login control
const username = ref("vmjc5767");
const password = ref("cs20cs1527");
const submitted = ref(false);

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
  () => username.value.trim() !== "" && password.value.trim() !== ""
);

let items = ref([]);
const apiService = useClientes();
const fetchData = async () => {
  try {
    const data = await apiService.postData({ "username": username.value.trim(), "password": password.value.trim() });
    items.value = data;
    //responseData.value = JSON.stringify(data);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

const onLogin = () => {
  submitted.value = true;
  fetchData();

  // if (username.value.trim() != '' && password.value.trim() === 'admin') {
  if (Object.keys(items.value).length) {
    store.commit('updateGlobalUser', username.value.trim());
    store.commit('updateGlobalUserId', items.value[0].id_cliente);
    store.commit('updateGlobalLogged', true);
    toastMessage.value = "Satisfactoriamente ingresad@!";
    showToast.value = true;
    router.push('/home');
  }
};

const onSignup = () => {
  // toastMessage.value = "Successfully logged in!";
  // showToast.value = true;
  //
  //username.value = "";
  //password.value = "";
  router.push('/register');
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