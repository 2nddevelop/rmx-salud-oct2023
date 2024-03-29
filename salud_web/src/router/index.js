import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import authService from "../services/authService";
import store from '../store/modules/authModule'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    ///////////Salud
    {
      path: '/doctores',
      name: 'doctores',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Doctores.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/planificaciones',
      name: 'planificaciones',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Planificaciones.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/planificacionReporte',
      name: 'planificacionReporte',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlanificacionReporte.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/centros',
      name: 'centros',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/Centros.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/especialidades',
      name: 'especialidades',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/Especialidades.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/tiposClientes',
      name: 'tiposClientes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/TiposCliente.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/pacientes',
      name: 'pacientes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Pacientes.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/pacientesSICE',
      name: 'pacientesSICE',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PacientesSICE.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/consultorios',
      name: 'consultorios',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/Consultorios.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasEmision',
      name: 'fichasEmision',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasEmision.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasDerivacion',
      name: 'fichasDerivacion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasDerivacion.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasFichero',
      name: 'fichasFichero',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasFichero.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasFicheroPlus',
      name: 'fichasFicheroPlus',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasFicheroPlus.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasPantalla',
      name: 'fichasPantalla',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasPantalla.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasPantallaAdmisiones',
      name: 'fichasPantallaAdmisiones',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasPantallaAdmisiones.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasSVitales',
      name: 'fichasSVitales',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasSVitales.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasConsultaB',
      name: 'fichasConsultaB',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasConsultaB.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/fichasReporte',
      name: 'fichasReporte',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/fichas/FichasReporte.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/historiales',
      name: 'historiales',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Historiales.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/cuadernos',
      name: 'cuadernos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/cuadernos/CuadernosView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/UsuariosView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/usuariosPassword',
      name: 'usuariosPassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/UsuariosPassword.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/roles',
      name: 'roles',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/Roles.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/usuariosrol',
      name: 'usuariosrol',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/parametros/UsuariosRol.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/avisos',
      name: 'avisos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/informativos/AvisosView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/noticias',
      name: ' noticias',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/informativos/NoticiasView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/logout',
      name: 'logout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      beforeEnter: (to, from, next) => {
        // Accede al estado de autenticación
        const isAuthenticated = store.isAuthenticated;
        console.log('final: ', isAuthenticated);
        if (isAuthenticated) {
          // El usuario está autenticado, permite el acceso a la ruta
          next();
        } else {
          // El usuario no está autenticado, redirige a la página de inicio de sesión
          next('/login');
        }
      },
      meta: { requiresAuth: true }
    }
  ]
})

// 777
// Middleware para verificar la autenticación antes de cada navegación

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['isAuthenticated'];
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si el usuario está autenticado
    // console.log(isAuthenticated: ', isAuthenticated);
    if (isAuthenticated) { //}.isAuthenticated) {
      // El usuario está autenticado, permitir el acceso a la ruta
      next();
    } else {
      // El usuario no está autenticado, redirigir al inicio de sesión
      next('/login');
    }
  } else {
    // La ruta no requiere autenticación, permitir el acceso
    next();
  }
});
// 777

export default router
