<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Encabezado.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" />

    <div class="wrapper">
      <HelloWorld msg="Plataforma de Salud" />
      <nav>
        <ul>
          <li class="menu">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="menu">
            <RouterLink to="/planificaciones">Planificación</RouterLink>
          </li>
          <li class="menu"><a href="#">Parametros</a>
            <div class="submenu">
            <ul>
              <li>
                <RouterLink to="/especialidades">Especialidades</RouterLink>
              </li>
              <li>
                <RouterLink to="/tiposClientes">Tipos Cliente</RouterLink>
              </li>
              <li>
                <RouterLink to="/centros">Centros Medicos</RouterLink>
              </li>
            </ul>
            </div>
          </li>
          <li class="menu"><a href="#">Maestros</a>
            <div class="submenu">
              <ul>
                <li>
                  <RouterLink to="/doctores">Doctores</RouterLink>
                </li>
                <li>
                  <RouterLink to="/clientes">Clientes</RouterLink>
                </li>
                <li class="menu">
                  <RouterLink to="/usuarios">Usuarios</RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="menu">
            <RouterLink to="/logout">Ingresar</RouterLink>
          </li>
        </ul>
      </nav>    
    </div>
  </header>

  <RouterView />

</template>


<style scoped>
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
</style>

