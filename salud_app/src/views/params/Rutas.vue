<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Rutas</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="item in items" :key="item.rut_id">
          <ion-label class="ion-text-wrap">
            <h2>{{ item.rut_codigo }}</h2>
            <p>Descripción: {{ item.rut_descripcion }}</p>
            <p>Horario: {{ item.hor_codigo }} - {{ item.hor_descripcion }}</p>
            <p>De: {{ item.hor_de }} A: {{ item.hor_a }}</p>
            <p>Estado:&nbsp;
              <ng-template v-if=" item.rut_estado == 'P'" >
                <ion-badge color="warning">Pendiente</ion-badge>
              </ng-template>
              <ng-template v-if=" item.rut_estado == 'A'" >
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
import { useServiceRutas } from '@/services/serviceRutas';
import { modalController } from '@ionic/vue';
import ModalRutas from '@/views/params/ModalRutas.vue';
import { useStore } from 'vuex';
import { addOutline, eyeOutline, pencilOutline } from 'ionicons/icons';

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);

let items = ref([]);

const apiService = useServiceRutas();
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
    component: ModalRutas,
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
