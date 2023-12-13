<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Noticias</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="item in items" :key="item.nt_id">
          <ion-label class="ion-text-wrap">
            <h2>{{ item.nt_titulo }}</h2>
            <p>{{ item.nt_contenido }}</p>
            <p>Estado:&nbsp;
              <ng-template v-if=" item.nt_estado == 'P'" >
                <ion-badge color="warning">Pendiente</ion-badge>
              </ng-template>
              <ng-template v-if=" item.nt_estado == 'A'" >
                <ion-badge color="success">Activo</ion-badge>
              </ng-template>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonButtons,
  IonMenuButton, IonButton, IonContent, IonList,
  IonItem, IonTitle, IonRow, IonCol,
  IonInput, IonToast, IonSelect, IonSelectOption,
  IonIcon, IonFooter, IonLabel, IonBadge
} from "@ionic/vue";
import { useServiceNoticias } from '@/services/serviceNoticias';

let items = ref([]);

const apiService = useServiceNoticias();
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
  console.log('entro Noticias');
  fetchData();
});

</script>

<style scoped>
/* tus estilos van aquí */
</style>
