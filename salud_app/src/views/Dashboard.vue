<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Dashboard</ion-title>
            </ion-toolbar>
        </ion-header>


    <ion-content class="ion-padding">
        <div>
            <Bar :data="data" :options="options" />
        </div>
        <br /><br />
        <div>
            <Bar :data="data2" :options="options2" />
        </div>
    </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonButtons,
    IonMenuButton, IonButton, IonContent, IonList,
    IonItem, IonTitle, IonRow, IonCol,
    IonInput, IonToast, IonSelect, IonSelectOption,
    IonIcon, IonFooter, IonLabel, IonBadge
    } from "@ionic/vue";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
  
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: {
        IonPage, Bar
    },
    data() {
      return {
        data: {
          labels: ['Agosto', 'Septiembre', 'Octubre'],
          datasets: [
            { label:'Atendidos', data: [40, 20, 12],   backgroundColor: 'red',        borderColor: '#36A2EB' }, 
            { label:'Pendientes', data: [80, 30, 18],  backgroundColor: 'lightblue',  borderColor: '#36A2EB' }
            ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              grid: {
                display: true,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Servicio de Atención al Cliente',
            },
          },
        },


        data2: {
          labels: ['Noviembre', 'Diciembre'],
          datasets: [
            { label:'Atendidos', data: [27, 11], backgroundColor: 'green'}, 
            { label:'Pendientes', data: [33, 21], backgroundColor: 'yellow'}, 
            ]
        },
        options2: {
          responsive: true,
          scales: {
            x: {
              type: 'category',
              grid: {
                display: true,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Servicios Especiales',
            },
          },
        },
      }
    }
  }
  </script>