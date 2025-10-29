import { useToggleStore } from '@/stores/toggle'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth'
import { redirectIfUnauthenticated, redirectIfAuthenticated, redirectIfCompanyNotGetPlans } from './guards'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },

  routes: [
    {
      path: '/',
      name: '',
      beforeEnter: [
        redirectIfUnauthenticated,
        redirectIfCompanyNotGetPlans
      ],
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
          // beforeEnter: RequiresAdminRole
        },
        {
          path: '/clientes',
          name: 'clients',
          component: () => import('../views/Clients.vue'),
        },
        {
          path: '/perfil-cliente/:id',
          name: 'client-profile',
          component: () => import('../views/ClientProfile.vue'),
        },
        {
          path: '/equipe',
          name: 'team',
          component: () => import('../views/Team.vue'),
        },
        {
          path: '/equipe/usuario',
          name: 'userProfile',
          component: () => import('../views/UserProfile.vue'),
        },
        {
          path: '/configuracoes',
          name: 'settings',
          component: () => import('../views/Settings.vue'),
        },
        {
          path: '/simulador',
          name: 'simulator',
          component: () => import('../views/Simulator.vue'),
        },
        {
          path: '/solicitacoes',
          name: 'solicitations',
          component: () => import('../views/Solicitations.vue'),
        },
        {
          path: '/pagamentos',
          name: 'payments',
          component: () => import('../views/Payments.vue'),
        },
        {
          path: '/solicitar-credito',
          name: 'credit-request',
          component: () => import('../views/CreditRequest.vue'),
        },
        {
          path: '/receber-pagamento',
          name: 'receive-payment',
          component: () => import('../views/ReceivePayment.vue'),
        },
        {
          path: '/cadastrar-cliente',
          name: 'client-register',
          component: () => import('../views/ClientRegister.vue'),
        },
        {
          path: '/cadastrar-usuario',
          name: 'user-register',
          component: () => import('../views/RegisterUser.vue'),
        },
        {
          path: '/informacoes',
          name: 'company-info',
          component: () => import('../views/Info.vue'),
        }
      ]
    },

    {
      path: '/login',
      name: 'login',
      beforeEnter: redirectIfAuthenticated,
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/auth/Logout.vue'),
    },
    {
      path: '/cadastrar',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/esqueci-senha',
      name: 'forgot-password',
      component: () => import('../views/auth/ForgotPassword.vue'),
    },
    {
      path: '/verificar-email',
      name: 'verify-email',
      component: () => import('../views/auth/VerifyEmail.vue'),
    },
    {
      path: '/planos',
      name: 'plans',
      component: () => import('../views/Plans.vue'),
    },
    {
      path: '/sucesso-assinatura',
      name: 'subscription-success',
      component: () => import('../views/SubscriptionSuccess.vue'),
    },
    {
      path: '/erro-assinatura',
      name: 'subscription-error',
      component: () => import('../views/SubscriptionError.vue'),
    }

  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.sanctum()
  const useToggle = useToggleStore()
  useToggle.sidebar = false

  next()
})



export default router
