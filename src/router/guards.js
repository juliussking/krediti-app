import { useMeStore } from '../stores/auth/me'
export const redirectIfUnauthenticated = (to, from, next) => {
    const meStore = useMeStore()
    if (!meStore.isLoggedIn) {
        next({ name: 'login' })
    } else {
        next()
    }
}

export const redirectIfAuthenticated = (to, from, next) => {
    const meStore = useMeStore()
    if (meStore.isLoggedIn) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
}

export const redirectIfCompanyNotGetPlans = (to, from, next) => {
    const meStore = useMeStore()

    if (!meStore.user.company_hasSubscription) {
        const exceptions = ['plans', 'subscription-success', 'subscription-error']

        if (!exceptions.includes(to.name)) {
            return next({ name: 'plans' })
        }
    }

    next()
}
// export const RequiresAdminRole = (to, from, next) => {
//     const meStore = useMeStore()

//     if (!meStore.roles.includes('usuario')) {

//         return next({ name: 'clients' })
//     }

//     next()
// }
