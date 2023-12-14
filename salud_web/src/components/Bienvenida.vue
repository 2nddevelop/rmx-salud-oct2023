<script setup>
import WelcomeItem from './BienvenidaItem.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <WelcomeItem>
      <template #icon>
        <i class="fa-solid fa-user fa-2xl"></i>
      </template>
      <template #heading>Usuario</template>
      <span class="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-red-600/10">
        {{ usr_nombres }}
      </span>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="fa-solid fa-mask fa-2xl"></i>
      </template>
      <template #heading>Rol</template>
      <span class="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-red-600/10">
        {{ rol_id }} - {{ rol_descripcion }}
      </span>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="fa-solid fa-building fa-2xl"></i>
      </template>
      <template #heading>Centro</template>
      <span class="inline-flex items-center rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-red-600/10">
        {{ cnt_descripcion }}
      </span>
    </WelcomeItem>
  </div>
  
  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-calendar-days fa-2xl"></i>
    </template>
    <template #heading>Planificación</template>

    La plataforma permite una adecuada planificación en función 
    de los recursos y capacidades del centro de atención en salud.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-id-card fa-2xl"></i>
    </template>
    <template #heading>Kardex</template>

    La plataforma mantiene un kardex centralizado de información de 
    Pacientes, sus Historiales Médicos y todo el personal Médico.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-ticket fa-2xl"></i>
    </template>
    <template #heading>Fichas</template>

    La plataforma maneja la generación de fichas a traves de internet y 
    de manera presencial, tambien permite una fila virtual para la 
    respectiva atención.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <i class="fa-solid fa-clipboard fa-2xl"></i>
    </template>
    <template #heading>Atención</template>

    La plataforma tiene la capacidad de gestionar la toma de Signos Vitales y
    la Atención de  <a href="#" target="_blank" rel="noopener">Consulta Externa</a>.
  </WelcomeItem>

</template>


<script>
export default {
  data() {
    return {
      rol_id: '',
      rol_descripcion: '',
      cnt_descripcion: '',
      usr_nombres: '',
    };
  },

  mounted() {
    this.rol_id = localStorage.getItem('rol_id');
    this.rol_descripcion = localStorage.getItem('rol_descripcion');
    this.cnt_descripcion = localStorage.getItem('cnt_descripcion');
    this.usr_nombres = localStorage.getItem('usr_nombres');

    this.rol_id = this.rol_id ? this.rol_id : '';
    this.rol_descripcion = this.rol_descripcion ? this.rol_descripcion : '';
    this.cnt_descripcion = this.cnt_descripcion ? this.cnt_descripcion : '';
    this.usr_nombres = this.usr_nombres ? this.usr_nombres : '';
  },

  methods: {

  },
};
</script>
