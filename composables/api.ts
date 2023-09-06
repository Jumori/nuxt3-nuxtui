import { useEnvStore } from '@/store/env'
import { useAuthStore } from '@/store/auth'

export const useApi = () => {
  const envStore = useEnvStore()
  const authStore = useAuthStore()

  const userApi = $fetch.create({
    baseURL: envStore.apiURL,

    async onRequest({ request, options }) {
      if (
        authStore.isAuthenticated &&
        typeof request === 'string' &&
        !request.includes('login')
      ) {
        options.headers = {
          ...options.headers,
          token: `${authStore.token}`
        }
      }
    },

    async onResponse({ request, response, options }) {
      if (response._data?.sessionToken) {
        authStore.setToken({
          token: response._data?.sessionToken,
          tokenExpirationDate: new Date()
        })
      }
    }
  })

  return { userApi }
}
