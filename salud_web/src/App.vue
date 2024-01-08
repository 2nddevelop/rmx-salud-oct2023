<template>
  <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
<div class="min-h-full">
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <!--img class="h-8 w-8" src="/img/logo.png" alt="Tú logo"-->
              <RouterLink :to="{ path: '/' }" class="nav-link menu-link">
                <h1><strong>Yo Te Ayudo</strong></h1>
              </RouterLink>
          </div>
          <div class="hidden md:block text-sm">
            <div class="ml-10 flex items-baseline space-x-4">
              <ul class="menu">
                <li v-for="item in filteredMenuItems" :key="item.id" class="menu-item">
                  <a v-if="item.children" href="#" class="menu-link">{{ item.label }}</a>
                  <ul v-if="item.children" class="submenu">
                    <li v-for="child in item.children" :key="child.id" class="submenu-item">
                      <RouterLink :to="child.link" class="submenu-link">{{ child.label }}</RouterLink>
                    </li>
                  </ul>
                  <RouterLink v-else :to="item.link" class="menu-link">{{ item.label }}</RouterLink>
                </li>

                <li class="menu-item"><!-- menu Ingresar -->
                  <RouterLink to="/logout" class="nav-link menu-link">Ingresar</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
    
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden text-xs" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <ul class="menu">
          <li class="menu-item"><!-- menu Inicio -->
            <RouterLink :to="{ path: '/' }" class="nav-link menu-link">Inicio</RouterLink>
          </li>
          <li v-for="item in filteredMenuItems" :key="item.id" class="menu-item">
            <a v-if="item.children" href="#" class="menu-link">{{ item.label }}</a>
            <ul v-if="item.children" class="submenu">
              <li v-for="child in item.children" :key="child.id" class="submenu-item">
                <RouterLink :to="child.link" class="submenu-link">{{ child.label }}</RouterLink>
              </li>
            </ul>
            <RouterLink v-else :to="item.link" class="menu-link">{{ item.label }}</RouterLink>
          </li>
          <li><!-- menu Ingresar -->
            <RouterLink to="/logout" class="nav-link menu-link">Ingresar</RouterLink>
          </li>
        </ul>

      </div>
    </div>
  </nav>
  
  <main>
    <div class="mx-auto max-w-7xl py-1 sm:px-1 md:px-2 lg:px-1">

      <!-- Your content -->
      <RouterView />

    </div>
  </main>
</div>

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Encabezado.vue'
import { ref } from 'vue';

// 1 rome@gmail.com
// 3 kardex@gmail.com
// 4 fichas@gmail.com
// 5 enfermera@gmail.com
// 6 doctor@gmail.com
// 7 doctorProvincia@gmail.com

// 1 Admin
// 2 Kardex
// 3 Fichas
// 4 Enfermera
// 5 Doctor
// 6 Doctor Provincia

const rol_id = localStorage.getItem('rol_id');
const userRoles = ref([parseInt(rol_id) > 0 ? parseInt(rol_id) : 0]);
//const userRoles = ref([1]);

const menuItems = ref([
  // { id: 1, label: 'Inicio', link: '/', roles: [1, 2, 3, 4, 5, 6] },
  { id: 2, label: 'Planificación', link: '/planificaciones', roles: [1, 2]  },
  { id: 3, label: 'Kardex', roles: [1, 2],  children: [
    { id: 31, label: 'Pacientes', link: '/pacientes', roles: [1, 2]  },
    { id: 32, label: 'Historial Clínico', link: '/historiales', roles: [1, 2]  },
    { id: 33, label: 'Médicos', link: '/doctores', roles: [1, 2]  },
    { id: 34, label: 'Pacientes SICE', link: '/pacientesSICE', roles: [1, 2]  },
  ]},
  { id: 4, label: 'Fichas', roles: [1, 2, 3, 4, 5, 6], children: [
    { id: 41, label: 'Admisiones', link: '/fichasEmision', roles: [1, 2, 3, 4]  },
    { id: 42, label: 'Derivación', link: '/fichasDerivacion', roles: [4, 6]  },
    { id: 43, label: 'Fichero', link: '/fichasFichero', roles: [1, 2, 3, 4]  },
    { id: 44, label: 'Pantalla', link: '/fichasPantalla', roles: [1, 2, 3, 4, 5]  },
  ]},
  { id: 5, label: 'Consulta Médica', roles: [1, 4, 5], children: [
    { id: 51, label: 'Llamada Fichas', link: '/fichasAtencion', roles: [1, 4, 5]  },
    { id: 53, label: 'Consulta Externa', link: '/fichasConsultaB', roles: [1, 4, 5]  },
  ]},
  { id: 5, label: 'Instrumentos', roles: [1], children: [
    { id: 51, label: 'CIE', link: '/', roles: [1]  },
    { id: 52, label: 'Vademécum General', link: '/', roles: [1]  },
  ]},
  { id: 7, label: 'Parametros', roles: [1], children: [
    { id: 71, label: 'Establ. de Salud', link: '/centros', roles: [1]  },
    { id: 72, label: 'Especialidades', link: '/especialidades', roles: [1]  },
    { id: 73, label: 'Consultorios', link: '/consultorios', roles: [1]  },
    { id: 74, label: 'Tipos Paciente', link: '/tiposClientes', roles: [1]  },
    { id: 75, label: 'Usuarios', link: '/users', roles: [1]  },
    { id: 75, label: 'Roles', link: '/roles', roles: [1]  },
    { id: 75, label: 'Usuarios + Roles', link: '/usuariosrol', roles: [1]  },
    { id: 75, label: 'Cambio Clave', link: '/usuariosPassword', roles: [1]  },
  ]},
  //{ id: 99, label: 'Ingresar', link: '/logout', roles: [1, 2, 3, 4, 5]  },
]);
const checkRoles = roles => roles.some(role => {
  return userRoles.value.includes(role)
});
const filteredMenuItems = ref([]);

// Filtrar los elementos del menú al iniciar el componente
filteredMenuItems.value = menuItems.value.filter((item) => {
  if (item.roles) {
    return checkRoles(item.roles);
  }
  return true;
});

console.log('filteredMenuItems: ', filteredMenuItems.value);

</script>


<style scoped>

nav {
  background-color: #333;
  color: white;
}

.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.menu-item {
  position: relative;
  margin: 5px;
}

.menu-link,
.submenu-link {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  display: block;
  padding: 1px;
  margin: 10px;
}

.menu-link:hover,
.submenu-link:hover {
  color: #ffd700;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 250px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
}

.menu-item:hover .submenu {
  display: block;
}

.submenu-item {
  margin: 0;
}

.submenu-link {
  padding: 0px;
  display: block;
}

.submenu-link:hover {
  background-color: #555;
}
</style>
