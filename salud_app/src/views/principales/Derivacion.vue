<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Derivación</ion-title>
        <ion-button slot="end" color="primary" @click="fetchData()"> 
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="false">
      <ion-list>
        <ion-item>
          <ion-input type="date" label-placement="stacked">Fecha</ion-input>
        </ion-item>
        <ion-item>
          <ion-select label="Centro" labelPlacement="floating"
            placeholder="Centro"
            spellcheck="false" autocapitalize="off" required
            >
            <ion-select-option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">
              {{ c.cnt_descripcion }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-input label="CI" labelPlacement="floating" 
            placeholder="CI Paciente"
            spellcheck="false" autocapitalize="on" required
          ></ion-input>
          <ion-button>Buscar</ion-button>
        </ion-item>
        <ion-item>
          <ion-input label="Nombres Paciente" labelPlacement="floating" 
            placeholder="CI Paciente"
            spellcheck="false" autocapitalize="on" required disabled
          ></ion-input>
        </ion-item>
      </ion-list>
      <!--ion-button color="primary" @click="openModal(item)"><ion-icon :icon="cardOutline"></ion-icon></ion-button>
      <ion-button color="primary" @click="openModal(item)"><ion-icon :icon="eyeOutline"></ion-icon></ion-button-->
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
import { useCentros } from '@/services/serviceCentros';
import { useEspecialidades } from '@/services/serviceEspecialidades';
import { modalController } from '@ionic/vue';
import ModalCuotas from '@/views/principales/ModalCuotas.vue';
import { useStore } from 'vuex';
import { addOutline, cardOutline, eyeOutline, pencilOutline } from 'ionicons/icons';

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);
const globalUserId = ref(store.state.globalUserId);
//const globalCntId = ref(store.state.globalCntId) || 1;

let item = ref({});
let centros = ref([]);
let especialidades = ref([]);
const apiService = useCentros();
const apiServiceEsp = useEspecialidades();

const fetchData = async () => {
  try {
    const data = await apiService.fetchData();
    centros.value = data;
    console.log('centros: ', centros.value);
    //responseData.value = JSON.stringify(data);
    const dataEsp = await apiServiceEsp.fetchData();
    especialidades.value = dataEsp;
    console.log('Especialidades: ', especialidades.value);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

onMounted(async () => {
  console.log('entro Derivacion');
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
