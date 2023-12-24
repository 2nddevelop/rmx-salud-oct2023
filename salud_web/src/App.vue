<template>
  <nav>
    <div class="grid grid-cols-4 gap-3">
    <div class="flex justify-start logo-cont_ainer col-md-1">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50">
    </div>
    <div class="col-md-11">
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
  console.log(role, userRoles);
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
