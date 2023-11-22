<template>
  <nav>
    <div class="grid grid-cols-4 gap-3">
    <div class="flex justify-start logo-cont_ainer col-md-1">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50">
    </div>
    <div class="col-md-11">
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.id" class="menu-item">
          <a v-if="item.children" href="#" class="menu-link">{{ item.label }}</a>
          <ul v-if="item.children" class="submenu">
            <li v-for="child in item.children" :key="child.id" class="submenu-item">
              <!--a :href="child.link" class="submenu-link">{{ child.label }}</a-->
              <RouterLink :to="child.link" class="submenu-link">{{ child.label }}</RouterLink>
            </li>
          </ul>
          <!--a v-else :href="item.link" class="menu-link">{{ item.label }}</a-->
          <RouterLink v-else :to="item.link" class="menu-link">{{ item.label }}</RouterLink>
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

const menuItems = ref([
  { id: 1, label: 'Inicio', link: '/' },
  { id: 2, label: 'Planificación', link: '/planificaciones' },
  { id: 3, label: 'Kardex', children: [
    { id: 31, label: 'Pacientes', link: '/clientes' },
    { id: 32, label: 'Historial_Médico', link: '/' },
    { id: 32, label: 'Doctores', link: '/doctores' },
  ]},
  { id: 4, label: 'Fichas', children: [
    { id: 41, label: 'Emisión', link: '/fichasEmision' },
    { id: 42, label: 'Atención', link: '/fichasAtencion' },
  ]},
  { id: 5, label: 'Consulta Médica', children: [
    { id: 51, label: 'Signos_Vitales', link: '/signosVitales' },
    { id: 52, label: 'Consulta_Externa', link: '/fichasConsulta' },
  ]},
  { id: 5, label: 'Instrumentos', children: [
    { id: 51, label: 'CIE', link: '/' },
    { id: 52, label: 'Vademécum_General', link: '/' },
  ]},
  { id: 7, label: 'Parametros', children: [
    { id: 73, label: 'Centros_Médicos', link: '/centros' },
    { id: 71, label: 'Especialidades', link: '/especialidades' },
    { id: 74, label: 'Consultorios', link: '/consultorios' },
    { id: 72, label: 'Tipos_Paciente', link: '/tiposClientes' },
    { id: 75, label: 'Usuarios', link: '/users' },
  ]},
  { id: 3, label: 'Ingresar', link: '/logout' },
]);
</script>

<!--style scoped>
header {
line-height: 1.5;
max-height: 100vh;
}

.logo {
display: block;
margin: 0 auto 2rem;
}

nav {
background-color: #333;
color: white;

text-align: left;
margin-left: 0rem;
font-size: 1rem;

padding: 1rem 0;
margin-top: 1rem;

}

ul {
list-style-type: none;
margin: 0;
padding: 10;
display: flex;
}

li {
margin: 0 10px;
}

a {
text-decoration: none;
color: white;
}

/*.menu:hover {
display: block;
background-color: white;
color: black;
}*/

.submenu {
display: none;
position: absolute;
height: 3rem;
background-color: gray;
}

li:hover .submenu {
display: block;
background-color: gray;
}

a:hover {
filter: blur(1px); 
color: '#00BD7E';
}

@media (min-width: 1024px) {
header {
display: flex;
/*place-items: center;*/
padding-right: calc(var(--section-gap) / 2);
}
}
</style-->

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
