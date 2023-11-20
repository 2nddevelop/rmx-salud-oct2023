<!-- Paginator.vue -->
<template>
    <div class="flex justify-end p-6">
      <nav class="flex items-center">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span class="mx-2">{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: { type: Number, required: true },
      totalPages: { type: Number, required: true },
      prevPage: { type: Function, required: true },
      nextPage: { type: Function, required: true },
    },
  };
  </script>
  
  <style>
  /* Estilos si es necesario */
  </style>
  