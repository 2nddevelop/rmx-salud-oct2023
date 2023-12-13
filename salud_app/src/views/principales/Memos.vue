<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Memos</ion-title>
        <ion-button slot="end" color="primary" @click="fetchData()"> 
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="false">
      <ion-list>
        <ion-item v-for="item in items" :key="item.id_memo">
          <ion-label class="ion-text-wrap">
            <p><strong>Poliza: {{ item.id_memo }} - {{ item.poliza }}</strong></p>
            <p>Ref: {{ item.referencia }}</p>

            <!--p>Solicitud: {{ item.sac_solicitud }}</p>
            <p>Fecha: {{ item.sac_fec_solicitud }}</p>
            <p>Respuesta: {{ item.sac_respuesta }}</p>
            <p>Fecha: {{ item.sac_fec_respuesta }}</p>
            <p>Tipo:&nbsp;
              <ng-template v-if=" item.sac_tsac_id == '1'" >
                <ion-badge color="dark">Denuncia</ion-badge>
              </ng-template>
              <ng-template v-if=" item.sac_tsac_id == '2'" >
                <ion-badge color="light">Reclamo</ion-badge>
              </ng-template>
              &nbsp;Estado:&nbsp;
              <ng-template v-if=" item.sac_estado == 'P'" >
                <ion-badge color="warning">Pendiente</ion-badge>
              </ng-template>
              <ng-template v-if=" item.sac_estado == 'A'" >
                <ion-badge color="success">Respondido</ion-badge>
              </ng-template>
            </p-->
          </ion-label>
          <ion-button color="primary" @click="openModal(item)"><ion-icon :icon="cardOutline"></ion-icon></ion-button>
          <ion-button color="primary" @click="openModal(item)"><ion-icon :icon="eyeOutline"></ion-icon></ion-button>
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
import { useMemos } from '@/services/serviceMemos';
import { modalController } from '@ionic/vue';
import ModalCuotas from '@/views/principales/ModalCuotas.vue';
import { useStore } from 'vuex';
import { addOutline, cardOutline, eyeOutline, pencilOutline } from 'ionicons/icons';

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);
const globalUserId = ref(store.state.globalUserId);

let items = ref([]);
const apiService = useMemos();
const fetchData = async () => {
  try {
    const data = await apiService.fetchData(globalUserId.value);
    items.value = data;
    //responseData.value = JSON.stringify(data);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

onMounted(async () => {
  console.log('entro Memos');
  fetchData();
});

const openModal = async (i: any) => {
  i = { 
    id_memo: i.id_memo,
  }

  const modal = await modalController.create({
    component: ModalCuotas,
    //cssClass: 'my-custom-modal-class', // Puedes personalizar las clases CSS del modal
    componentProps: {
      item: i,
    },
  });

  await modal.present();
};

</script>

<style scoped>
menuda {
  font-size: x-small;
}
</style>
