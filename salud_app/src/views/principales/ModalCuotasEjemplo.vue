<template>
  <ion-page style="height: 700px">
    <ion-header>
      <ion-toolbar>
        <ion-title>Cuotas</ion-title>
        <ion-button slot="start" @click="closeModal"> 
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="item in cuotas" :key="item.id_memo">
          <ion-label class="ion-text-wrap">
            <p><strong>Nro.: {{ item.numerocuota }}</strong></p>
            <p>Codigo: {{ item.cod_cuota }}</p>
            <p>Vencimiento: {{ item.fechavencimiento }}</p>
            <p>Estado: {{ item.estado }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <!--ng-template>
        <ion-padding class="ion-text-wrap">
          <h2>{{ item.sac_solicitud }}</h2>
          <p class="ion-text-wrap">Fecha solicitud: {{ item.sac_fec_solicitud }}</p>
          <p class="ion-text-wrap">Respuesta: {{ item.sac_respuesta }}</p>
          <p class="ion-text-wrap">Fecha respuesta{{ item.sac_fec_respuesta }}</p>
          <p class="ion-text-wrap">Ubicación: {{ item.sac_punto }}</p>
        </ion-padding>
      </ng-template-->
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
import { useCuotas } from '@/services/serviceCuotas';
import { modalController } from '@ionic/vue';
import { useStore } from 'vuex';
import { arrowBackOutline } from 'ionicons/icons';

let cuotas = ref([]);
const apiCuotas = useCuotas();
const fetchData2 = async () => {
  try {
    const data = await apiCuotas.fetchData(props.item.id_memo);
    cuotas.value = data;
    //responseData.value = JSON.stringify(data);
  } catch (error) {
    console.error('Error in fetchData2:', error);
  }
};

let props = defineProps(['item']);
console.log('item >>> ', props.item);
const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);

const closeModal = () => {
  modalController.dismiss();
};

onMounted(() => {
  fetchData2();
});

</script>

<style scoped>
menuda {
  font-size: x-small;
}
</style>