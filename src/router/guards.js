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

export const redirectIfCompanyNotGetPlans = async (to, from, next) => {
    const meStore = useMeStore()

    if (!meStore.user.hasSubscription) {

        return await next({ name: 'plans' })

    }

    next()
}