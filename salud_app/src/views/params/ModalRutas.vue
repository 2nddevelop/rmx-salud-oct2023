<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ruta</ion-title>
        <ion-button slot="start" @click="closeModal"> 
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label class="ion-text-wrap">
            <h2>{{ item.rut_codigo }}</h2>
            <p>Descripción: {{ item.rut_descripcion }}</p>
            <p>Horario: {{ item.hor_codigo }} - {{ item.hor_descripcion }}</p>
            <p>De: {{ item.hor_de }} A: {{ item.hor_a }}</p>
      </ion-label>
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

    // 777 const punto = props.item.alt_punto.split(',');
    // 777 L.marker([punto[0], punto[1]]).addTo(mymap);
    // Cargar GeoJSON desde el archivo
    let centro2 = [];
    const archivo = '/assets/geo/' + props.item.rut_archivo;
    fetch(archivo)
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data).addTo(mymap);
        // 777 para poligonocentro2 = data.features[0].geometry.coordinates[0][0];
        // 777 para lineas
        centro2 = data.features[0].geometry.coordinates[0];
    })
    .catch(error => console.error('Error cargando GeoJSON:', error));

    const markerIcon = L.icon({
      iconUrl: '/assets/markers/pin.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    setTimeout(() => {
      mymap.invalidateSize();
      if (centro2) {
        const marker = L.marker([centro2[1], centro2[0]], { icon: markerIcon }).addTo(mymap);
        const nuevaPosicion = L.latLng(centro2[1], centro2[0]); // Nueva posición en coordenadas latitud y longitud
        mymap.setView(nuevaPosicion, 15); // 15 es el nivel de zoom deseado
      }
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