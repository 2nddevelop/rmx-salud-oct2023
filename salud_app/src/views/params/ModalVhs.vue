<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vehículo</ion-title>
        <ion-button slot="start" @click="closeModal"> 
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label class="ion-text-wrap">
            <h2>{{ item.vh_codigo }}</h2>
            <p>Placa: {{ item.vh_placa }}</p>
            <p>Tipo: {{ item.tvh_codigo }} - {{ item.tvh_descripcion }}</p>
      </ion-label>

      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      ></ion-toast>

      <div ref="mapContainer" class="map"></div>
    </ion-content>
    <ion-footer>
      <!--ion-label>Ubicación</ion-label-->
    </ion-footer>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonButtons,
  IonMenuButton, IonButton, IonContent, IonList,
  IonItem, IonTitle, IonRow, IonCol,
  IonInput, IonToast, IonSelect, IonSelectOption,
  IonIcon, IonFooter, IonLabel, IonBadge
} from "@ionic/vue";
import { ref, defineProps, onMounted, nextTick } from 'vue';
import { modalController } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useStore } from 'vuex';
import axios from 'axios';

const showToast = ref(false);
const toastMessage = ref("");

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const mapContainer = ref(null);

let props = defineProps(['item']);

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);

const closeModal = () => {
  modalController.dismiss();
};

const initializeMap = async () => {
  await nextTick();

  if (mapContainer.value) {
    const centro = globalCiudad.value.split(',');
    const mymap = L.map(mapContainer.value).setView([centro[0], centro[1]], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    let centro2 = [];

    const markerIcon = L.icon({
      iconUrl: '/assets/markers/pin.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    setTimeout(() => {
      mymap.invalidateSize();
      
      // consumir servicio de rastreo satelital
      const authorizationToken = ref('vkLm6prxtXreuBrvoSNZ4QtHMd2Tx4ifPDuwHklJXM8/uJsDlNqmiw8tqvyYD/!rEZCSfcjsvh3SLpAllXfmJOvL-');
      const responseData = ref(null);
      const apiUrl = 'http://159.223.161.160:3200/api/v1/vehicle/gps';
      const parametroEnBody = { "codeOperation": props.item.vh_codigo };

      const fetchData = async () => {
        try {
          const response = await axios.post(apiUrl, parametroEnBody, {
            headers: {
              Authorization: `Bearer ${authorizationToken.value}`
            }
          });

          responseData.value = response.data;
          if (responseData.value.status) {
            console.log('lat', responseData.value.data.latitude);
            console.log('lng', responseData.value.data.longitude);
            console.log(responseData.value.status);
            
            L.marker([ responseData.value.data.longitude, responseData.value.data.latitude ], { icon: markerIcon }).addTo(mymap);

            const nuevaPosicion = L.latLng(responseData.value.data.longitude, responseData.value.data.latitude, );
            mymap.setView(nuevaPosicion, 15);
          } else {
            toastMessage.value = "No se encuentra";
            showToast.value = true;
          }
        } catch (error) {
          console.error('Error en la llamada al servicio web:', error);
          toastMessage.value = "No se puede localizar al vehiculo";
          showToast.value = true;
        }
      };
      fetchData();
    }, 300);
  } else {
    console.error('El contenedor del mapa no se ha encontrado.');
  }
};

onMounted(() => {
  initializeMap();
});

</script>

<style scoped>
  .map {
    width: 100%;
    height: 100vh;
  }
</style>