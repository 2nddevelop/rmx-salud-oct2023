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
          <ion-input v-model="item.fecha" type="date" label-placement="stacked"
          @change="fetchPlanificaciones"
          >Fecha</ion-input>
        </ion-item>
        <ion-item>
          <ion-select v-model="item.cnt_id" label="Centro" labelPlacement="floating"
            @change="fetchPlanificaciones"
            placeholder="Centro"
            spellcheck="false" autocapitalize="off" required
            >
            <ion-select-option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">
              {{ c.cnt_descripcion }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-input v-model="item.ci" label="CI" labelPlacement="floating" 
            placeholder="CI Paciente"
            spellcheck="false" autocapitalize="on" required
          ></ion-input>
          <ion-button @click="buscarClienteXCI">Buscar</ion-button>
        </ion-item>
        <ion-item>
          <ion-input v-model="item.nombres" label="Nombres Paciente" labelPlacement="floating" 
            placeholder="CI Paciente"
            spellcheck="false" autocapitalize="on" disabled
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="item.fch_kdx_medico" label="Historial" labelPlacement="floating" 
            placeholder="Historial Clínico"
            spellcheck="false" autocapitalize="on" disabled
          ></ion-input>
        </ion-item>
        fch_kdx_medico
        <ion-item v-show="swMostrarEsp">
          <ion-padding>
            <label for="planif">Especialidades</label><br>
            <ion-button v-for="p in planificaciones" id="planif" name="planif"
              @click="mostrarDispo(p)"
            >{{ p.esp_descripcion }}</ion-button>
          </ion-padding>
        </ion-item>
        <ion-item>
          <ion-padding>
            <label for="dispo">Fichas Disponibles</label><br>
            <ng-template v-for="d in disponibles">
              <ng-template v-if="d.pln_fch_id == 0">
                <ion-button id="dispo" name="dispo"
                  @click="grabar" color="success"
                >{{ d.pln_hora }} {{ d.pln_fch_id }}</ion-button>
              </ng-template>
              <ng-template v-else>
                <ion-button id="dispo" name="dispo"
                  color="light"
                >{{ d.pln_hora }}</ion-button>
              </ng-template>
            </ng-template> 
          </ion-padding>
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
import { useClientes } from '@/services/serviceClientes';
import { usePlanificaciones } from '@/services/servicePlanificaciones';
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
let planificaciones = ref([]);
let disponibles = ref([]);
let swMostrarEsp = ref(false);
const apiService = useCentros();
const apiServicePlanif = usePlanificaciones();
const apiServiceClientes = useClientes();

const fetchData = async () => {
  try {
    // centros
    const data = await apiService.fetchData();
    centros.value = data;
    console.log('centros: ', centros.value);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

const fetchPlanificaciones = async () => {
  try {
    const data = await apiServicePlanif.fetchData(item.value.fecha, item.value.cnt_id);
    planificaciones.value = data;
    console.log('planificaciones: ', planificaciones.value);
    swMostrarEsp.value = true;
  } catch (error) {
    console.error('Error in fetchData:', error);
    swMostrarEsp.value = false;
  }
};

const mostrarDispo = async (p: any) => {
  try {
    disponibles.value = p.pln_data_disponibles;
    console.log('planificaciones: ', disponibles.value);
    swMostrarEsp.value = true;
  } catch (error) {
    console.error('Error in fetchData:', error);
    swMostrarEsp.value = false;
  }
};





const buscarClienteXCI = async () => {
  const cli_nit = item.value.ci;
  const clientes = await apiServiceClientes.getBuscarClienteXCI(cli_nit); 
  console.log("Clientes x CI: ", clientes[0]);
  if (Object.keys(clientes).length) {
    item.value.nombres = clientes[0].cli_data.cli_paterno + ' ' + clientes[0].cli_data.cli_materno + ' ' + clientes[0].cli_data.cli_nombres;
    item.value.cli_id = clientes[0].cli_id
    setTimeout(async () => {
      await buscarHistorialXCliId(item.value.cli_id);      
    }, 2000);
  } else {
    item.value.nombres = '';
    const confirmed = window.alert("El CI indicado NO existe !");
  }
};

const buscarHistorialXCliId = async (cli_id: any) => {
  const historial = await apiServiceClientes.getBuscarHistorialXCliId(cli_id); 
  console.log('Historial x CliId: ', historial);
  if (Object.keys(historial).length) {
    item.value.fch_kdx_medico = historial[0].hc_codigo;
  } else {
    item.value.fch_kdx_medico = 'a definir';
    const confirmed = window.alert("No tiene Kardex Médico !");
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
