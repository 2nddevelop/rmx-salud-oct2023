<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Normativa 001</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>Articulo 1</h2>
            <p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Articulo 2</h2>
            <p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Articulo 3</h2>
            <p>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
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
