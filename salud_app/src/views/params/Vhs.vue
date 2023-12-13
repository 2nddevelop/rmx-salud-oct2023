<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Vehículos</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="item in items" :key="item.vh_id">
          <ion-label class="ion-text-wrap">
            <h2>{{ item.vh_codigo }}</h2>
            <p>Placa: {{ item.vh_placa }}</p>
            <p>Tipo: {{ item.tvh_codigo }} - {{ item.tvh_descripcion }}</p>
            <p>Estado:&nbsp;
              <ng-template v-if=" item.vh_estado == 'P'" >
                <ion-badge color="warning">Pendiente</ion-badge>
              </ng-template>
              <ng-template v-if=" item.vh_estado == 'A'" >
                <ion-badge color="success">Activo</ion-badge>
              </ng-template>
            </p>
          </ion-label>
          <ion-button color="primary" @click="openModal(item)">
            <ion-icon :icon="eyeOutline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons,
  IonMenuButton, IonButton, IonContent, IonList,
  IonItem, IonTitle, IonRow, IonCol,
  IonInput, IonToast, IonSelect, IonSelectOption,
  IonIcon, IonFooter, IonLabel, IonBadge
} from "@ionic/vue";
import { ref, onMounted } from 'vue';
import { useServiceVehiculos } from '@/services/serviceVehiculos';
import { modalController } from '@ionic/vue';
import ModalVhs from '@/views/params/ModalVhs.vue';
import { useStore } from 'vuex';
import { addOutline, eyeOutline, pencilOutline } from 'ionicons/icons';

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);

let items = ref([]);

const apiService = useServiceVehiculos();
//const responseData = ref('');

const fetchData = async () => {
  try {
    const data = await apiService.fetchData();
    items = data;
    //responseData.value = JSON.stringify(data);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

onMounted(async () => {
  console.log('entro Avisos');
  fetchData();
});

const openModal = async (i: any) => {
  const modal = await modalController.create({
    component: ModalVhs,
    //cssClass: 'my-custom-modal-class', // Puedes personalizar las clases CSS del modal
    componentProps: {
      item: i
    },
  });

  await modal.present();
};
</script>

<style scoped>
/* tus estilos van aquí */
</style>
