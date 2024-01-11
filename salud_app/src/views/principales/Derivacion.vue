<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Derivación</ion-title>
        <ion-button slot="end" color="warning" @click="limpiar"> 
          <ion-icon :icon="closeOutline"></ion-icon>
          Limpiar
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="false">
      <ion-title>PACIENTE</ion-title>
      <ion-list>
        <ion-item v-show="!swMostrarReserva">
          <ion-padding style="width:100%; padding:10px; background-color: beige;">
            Ingrese el CI del Paciente para proceder con el proceso de Derivación
          </ion-padding>
        </ion-item>
        <ion-item>
          <ion-input v-model="item.ci" label="CI" labelPlacement="floating" 
            placeholder="CI del Paciente"
            spellcheck="false" autocapitalize="on" required
          ></ion-input>
          <ion-button @click="buscarClienteXCI">
            <ion-icon :icon="searchOutline"></ion-icon> Buscar
          </ion-button>
        </ion-item>
        <ion-item>
          <ng-template v-for="cli in clientes">
              <label style="font-size: small;">{{ cli.cli_data.cli_paterno }} {{ cli.cli_data.cli_materno }} {{ cli.cli_data.cli_nombres }} [{{ cli.cli_data.cli_nit }}]</label>
              <ion-button slot="end" @click="buscarHistorialXCliId(cli.cli_id); ">
                Obtener Historial
              </ion-button>
            <ion-input v-model="item.fch_kdx_medico" label="Historial" labelPlacement="floating" 
              placeholder="Historial Clínico"
              spellcheck="false" autocapitalize="on" disabled
            ></ion-input>
          </ng-template>
        </ion-item>
      </ion-list>

      <ion-title v-show="swMostrarReserva">RESERVA DE FICHA</ion-title>
      <ion-list>
        <ion-item v-show="swMostrarReserva">
          <ion-input v-model="item.fecha" type="date" label-placement="floating"
          @change="fetchPlanificaciones"
          >Fecha</ion-input>
        </ion-item>

        <ion-item v-show="swMostrarReserva">
          <ion-input v-model="item.fch_nro_derivacion" label-placement="floating"
          >No. Derivación</ion-input>
          <ion-input v-model="item.fch_fec_fin_derivacion" type="date" label-placement="floating"
          >Finalizacion</ion-input>
        </ion-item>
        
        <ion-item v-show="swMostrarReserva">
          <ion-select v-model="item.cnt_id" label="Centro" labelPlacement="floating"
            @update:modelValue="fetchPlanificaciones"
            placeholder="Centro"
            spellcheck="false" autocapitalize="off" required
            >
            <ion-select-option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">
              {{ c.cnt_descripcion }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item v-show="swMostrarReserva && swMostrarEsp">
          <ion-padding>
            <label for="planif">Especialidades</label><br>
            <ion-button v-for="p in planificaciones" id="planif" name="planif"
              @click="mostrarDispo(p)"
            >{{ p.esp_descripcion }}</ion-button>
          </ion-padding>
        </ion-item>

        <ion-item v-show="swMostrarReserva">
          <ion-padding>
            <label for="dispo">Fichas Disponibles</label><br>
            <ng-template v-for="d in disponibles">
              <ng-template v-if="d.pln_fch_id == 0">
                <ion-button id="dispo" name="dispo"
                  @click="grabarFicha(d.pln_fch_id, d.pln_hora)" color="success"
                >{{ d.pln_hora }}</ion-button>
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
      <ion-list>
        <ion-item>
          <ion-padding style="width:100%; padding:10px; background-color: beige;">
            Se seguira el siguiente procedimiento:
            <ol>
              <li>Introducir CI</li>
              <li>Obtener Historial Clínico</li>
              <li>Seleccionar Fecha</li>
              <li>Seleccionar Centro/Institución de salud</li>
              <li>Seleccionar Especialidad</li>
              <li>Seleccionar Ficha y Hora</li>
              <li>Grabar</li>
            </ol>
          </ion-padding>
        </ion-item>
      </ion-list>

      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      ></ion-toast>

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
import {
  archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp,
  heartOutline, heartSharp, mailOutline, mailSharp, searchOutline,
  paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp,
  warningOutline, warningSharp, home, homeOutline, exitOutline, 
  pinOutline, megaphoneOutline, alert, newspaperOutline, 
  timeOutline, mapOutline, alarmOutline, logInOutline, 
  callOutline, arrowBackOutline, carOutline, personOutline, closeOutline
} from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import { useCentros } from '@/services/serviceCentros';
import { useClientes } from '@/services/serviceClientes';
import { usePlanificaciones } from '@/services/servicePlanificaciones';
import { useFichas } from '@/services/serviceFichas';
import { modalController } from '@ionic/vue';
// import ModalCuotas from '@/views/principales/ModalCuotas.vue';
import { useStore } from 'vuex';
import { addOutline, cardOutline, eyeOutline, logoWindows, pauseCircle, pencilOutline } from 'ionicons/icons';

import { useRouter } from 'vue-router';
const router = useRouter();

const store = useStore();
const globalCiudad = ref(store.state.globalCiudad);
const globalUserId = ref(store.state.globalUserId);
//const globalCntId = ref(store.state.globalCntId) || 1;

const showToast = ref(false);
const toastMessage = ref("");

let item = ref({});
let centros = ref([]);
let clientes = ref([]);
let planificaciones = ref([]);
let disponibles = ref([]);
let swMostrarEsp = ref(false);
let swMostrarReserva = ref(false);
const apiService = useCentros();
const apiServicePlanif = usePlanificaciones();
const apiServiceClientes = useClientes();
const apiServiceFichas = useFichas();

const fetchData = async () => {
  try {
    // centros
    const data = await apiService.fetchData();
    centros.value = data;
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};

const fetchPlanificaciones = async () => {
  try {
    const data = await apiServicePlanif.fetchData(item.value.fecha, item.value.cnt_id);
    planificaciones.value = data;
    swMostrarEsp.value = true;
  } catch (error) {
    console.error('Error in fetchData:', error);
    swMostrarEsp.value = false;
  }
};

const mostrarDispo = async (p: any) => {
  try {
    item.value.fch_pln_id = p.pln_id;
    disponibles.value = p.pln_data_disponibles;
    swMostrarEsp.value = true;
  } catch (error) {
    console.error('Error in fetchData:', error);
    swMostrarEsp.value = false;
  }
};

const buscarClienteXCI = async () => {
  const cli_nit = item.value.ci;
  clientes.value = await apiServiceClientes.getBuscarClienteXCI(cli_nit); 
  if (clientes.value.length > 0) {
    toastMessage.value = "Paciente encontrado!";
    showToast.value = true;
  } else {
    //const confirmed = window.alert("El CI indicado NO existe !");
    swMostrarReserva.value = false;
    item.value.ci = '';
    item.value.fecha = '';
    item.value.cnt_id = '';
    item.value.fch_cli_id = '';
    item.value.fch_kdx_medico = '';
    clientes.value = [];
    planificaciones.value = [];
    disponibles.value = [];

    toastMessage.value = "No existe el Paciente";
    showToast.value = true;
  }
};

const buscarHistorialXCliId = async (cli_id: any) => {
  const historial = await apiServiceClientes.getBuscarHistorialXCliId(cli_id); 
  if (Object.keys(historial).length) {
    item.value.fch_cli_id = historial[0].hc_cli_id;
    item.value.fch_nro_ficha = '';
    item.value.fch_kdx_medico = historial[0].hc_codigo;
    swMostrarReserva.value = true;
  } else {
    item.value.fch_kdx_medico = 'a definir';
    item.value.fch_cli_id = '0';
    const confirmed = window.alert("No tiene Kardex Médico !");
    swMostrarReserva.value = false;
  }
};


const grabarFicha = async (ficha: any, hora: any) => {
  let reg = {};
  reg.fch_usr_id = 1; 
  reg.fch_estado = "P";
  reg.fch_cli_id = item.value.fch_cli_id;
  reg.fch_pln_id = item.value.fch_pln_id;
  reg.fch_nro_ficha = item.value.fch_nro_ficha;
  reg.fch_kdx_medico = item.value.fch_kdx_medico;
  reg.fch_tipo_atencion = 2;
  reg.fch_nro_derivacion = item.value.fch_nro_derivacion;
  reg.fch_fec_fin_derivacion = item.value.fch_fec_fin_derivacion;
  reg.fch_hora = hora;
  reg.filtro_fecha = item.value.fecha;
  reg.filtro_centro_id = item.value.cnt_id;

  const indexFicha = disponibles.value.findIndex(item => item.pln_hora === hora );
  if (indexFicha !== -1) {
    let updatedFicha = disponibles.value[indexFicha];
    updatedFicha.pln_fch_id = 1;
    disponibles.value.splice(indexFicha, 1, updatedFicha);
  }
  reg.pln_data_disponibles = disponibles.value;
  //this.reg.pln_id = this.pln_id;
  const savedReg = await apiServiceFichas.saveData(reg);
  limpiar();
  router.push('/home');
};

const limpiar = async () => {
  swMostrarReserva.value = false;
  item.value.ci = '';
  item.value.fecha = '';
  item.value.cnt_id = '';
  item.value.fch_kdx_medico = '';
  item.value.fch_tipo_atencion = 2;
  item.value.fch_nro_derivacion = '';
  item.value.fch_fec_fin_derivacion = null
  clientes.value = [];
  planificaciones.value = [];
  disponibles.value = [];
};


onMounted(async () => {
  console.log('entro Derivacion');
  fetchData();
});

/* const openModal = async (i: any) => {
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
};*/

</script>

<style scoped>
menuda {
  font-size: x-small;
}
</style>
