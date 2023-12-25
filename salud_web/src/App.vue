<template>

<!--div class="bg-white pt-4 pr-8 pb-4 pl-8">
  <nav class="w-full">
    <div class="flex w-full justify-between max-w-screen-2xl md:flex-row mt-auto mr-auto mb-auto ml-auto">
      <div class="flex flex-row bg-white justify-between items-center mt-2 mb-2 md:m-0 hidden md:flex">
        <a href="#" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-base">Product</a>
        <a href="#" fontfamily="Raleway" class="text-gray-600 text-center mr-6 font-medium text-base">Features</a>
        <a href="#" fontfamily="Raleway" class="text-gray-600 text-center font-medium text-base">Pricing</a>
      </div>
      <div class="bg-white flex-row flex items-center justify-center order-first md:order-none">
        <img src="https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png"
            class="w-12 md:w-16"/>
      </div>
      <div class="flex justify-center items-center md:justify-start hidden md:flex">
        <button fontfamily="Arial" class="h-9 w-24 text-gray-600 bg-white border-2 border-white flex items-center
            justify-center text-center rounded-lg text-lg font-normal mr-6">Sign in</button>
        <button fontfamily="Arial" class="h-9 w-24 text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900
            border-2 flex items-center justify-center text-center border-blue-700 rounded-lg text-lg font-normal
            mr-auto">Sign up</button>
      </div>
      <div class="md:hidden flex items-center">
        <div class="outline-none mobile-menu-button">
          <svg id="Windframe_ChtQoq_8Tt" fill="none" strokelinecap="round" stroke-linejoin="round" strokewidth="2"
              viewbox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-500 hover:text-green-500"><path
              id="Windframe_p7HkkHV49l" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </div>
      </div>
    </div>
    <div class="hidden md:hidden md:hidden mobile-menu">
      <div>
        <div class="flex flex-col">
          <a href="#" fontfamily="Raleway" class="text-gray-600 text-center mt-2 font-medium text-base">Product</a>
          <a href="#" fontfamily="Raleway" class="text-gray-600 text-center mt-2 font-medium text-base">Features</a>
          <a href="#" fontfamily="Raleway" class="text-gray-600 text-center mt-2 font-medium text-base">Pricing</a>
          <button fontfamily="Arial" class="h-9 w-24 text-gray-600 bg-white border-2 border-white flex items-center
              justify-center text-center rounded-lg text-lg font-normal mt-2 mr-auto ml-auto">Sign in</button>
          <button fontfamily="Arial" class="h-9 w-24 text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900
              border-2 flex items-center justify-center text-center border-blue-700 rounded-lg text-lg font-normal mt-2
              mr-auto ml-auto">Sign up</button>
        </div>
      </div>
    </div>
  </nav>
</div-->

<div class="w-full bg-white">
  <nav class="w-full sm:font-sm">
    <div class="flex w-full justify-between max-w-screen-2xl md:flex-row mt-auto mr-auto mb-auto ml-auto">
      <div class="flex justify-start logo-container">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50">
      </div>
      <div class="font-medium">
        <ul class="menu">
          <li><!-- menu Inicio -->
            <RouterLink :to="{ path: '/' }" class="nav-link menu-link">Inicio</RouterLink>
          </li>
          <li v-for="item in filteredMenuItems" :key="item.id" class="menu-item">
            <a v-if="item.children" href="#" class="menu-link">{{ item.label }}</a>
            <ul v-if="item.children" class="submenu">
              <li v-for="child in item.children" :key="child.id" class="submenu-item">
                <RouterLink :to="child.link" class="submenu-link">{{ child.label }}</RouterLink>
              </li>
            </ul>
            <!--a v-else :href="item.link" class="menu-link">{{ item.label }}</a-->
            <RouterLink v-else :to="item.link" class="menu-link">{{ item.label }}</RouterLink>
          </li>
          <li><!-- menu Ingresar -->
            <RouterLink to="/logout" class="nav-link menu-link">Ingresar</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

<RouterView />

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
  //{ id: 1, label: 'Inicio', link: '/', roles: [1, 2, 3, 4, 5, 6] },
  { id: 2, label: 'Planificación', link: '/planificaciones', roles: [1, 2]  },
  { id: 3, label: 'Kardex', roles: [1, 2],  children: [
    { id: 31, label: 'Pacientes', link: '/pacientes', roles: [1, 2]  },
    { id: 32, label: 'Historial_Clínico', link: '/historiales', roles: [1, 2]  },
    { id: 33, label: 'Médicos', link: '/doctores', roles: [1, 2]  },
  ]},
  { id: 4, label: 'Fichas', roles: [1, 2, 3, 4, 5, 6], children: [
    { id: 41, label: 'Emisión', link: '/fichasEmision', roles: [1, 2, 3, 4]  },
    { id: 42, label: 'Derivación', link: '/fichasDerivacion', roles: [4, 6]  },
    { id: 43, label: 'Fichero', link: '/fichasFichero', roles: [1]  },
    { id: 44, label: 'Pantalla', link: '/fichasPantalla', roles: [1]  },
  ]},
  { id: 5, label: 'Consulta Médica', roles: [1, 4, 5], children: [
    { id: 51, label: 'Llamada_Fichas', link: '/fichasAtencion', roles: [1, 4, 5]  },
    { id: 53, label: 'Consulta_Externa', link: '/fichasConsultaB', roles: [1, 4, 5]  },
  ]},
  { id: 6, label: 'Instrumentos', roles: [1], children: [
    { id: 61, label: 'CIE', link: '/', roles: [1]  },
    { id: 62, label: 'Vademécum_General', link: '/', roles: [1]  },
  ]},
  { id: 7, label: 'Parametros', roles: [1], children: [
    { id: 71, label: 'Centros_Médicos', link: '/centros', roles: [1]  },
    { id: 72, label: 'Especialidades', link: '/especialidades', roles: [1]  },
    { id: 73, label: 'Consultorios', link: '/consultorios', roles: [1]  },
    { id: 74, label: 'Tipos_Paciente', link: '/tiposClientes', roles: [1]  },
    { id: 75, label: 'Usuarios', link: '/users', roles: [1]  },
    { id: 76, label: 'Roles', link: '/roles', roles: [1]  },
    { id: 77, label: 'Usuarios_Roles', link: '/usuariosrol', roles: [1]  },
    { id: 78, label: 'Cambio_Clave', link: '/usuariosPassword', roles: [1]  },
  ]},
  //{ id: 99, label: 'Ingresar', link: '/logout', roles: [1, 2, 3, 4, 5]  },
]);
const checkRoles = roles => roles.some(role => { 
  // console.log(role, userRoles);
  return userRoles.value.includes(role);
});
const filteredMenuItems = ref([]);

// Filtrar los elementos del menú al iniciar el componente
filteredMenuItems.value = menuItems.value.filter(item => {
  if (item.roles) {
    return checkRoles(item.roles);
  }
  return true;
});

console.log('filteredMenuItems: ', filteredMenuItems);

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
  margin: 0 10px;
}

.menu-link,
.submenu-link {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  display: block;
  padding: 10px;
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
  background-color: #333;
  border: 1px solid #555;
}

.menu-item:hover .submenu {
  display: block;
}

.submenu-item {
  margin: 0;
}

.submenu-link {
  padding: 10px;
  display: block;
}

.submenu-link:hover {
  background-color: #555;
}
</style>
