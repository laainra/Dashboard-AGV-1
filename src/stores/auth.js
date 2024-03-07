import { defineStore } from 'pinia'

import { setCookies, certCookies } from '@/plugins/cookies'

import * as s$auth from '@/services/auth'

export const d$auth = defineStore({
  id: 'auth',
  state: () => ({
    id: undefined,
    name: undefined,
    role: undefined
  }),
  actions: {
    async a$setUser() {
      try {
        const { id, name, role } = certCookies()
        this.id = id
        this.name = name
        this.role = role
        return 'User Authenticated!'
      } catch ({ message }) {
        this.id = undefined
        this.name = undefined
        this.role = undefined
        throw message
      }
    },
    async a$login(body) {
      try {
        const { data } = await s$auth.login(body)
        setCookies('CERT', data.token, { datetime: data.expiresAt })
        return true
      } catch ({ error, message }) {
        throw message ?? error
      }
    }
  },
  getters: {
    g$user: ({ id, name, role }) => ({ id, name, role }),
    // determine if user is logged in
    isLoggedIn: ({ id }) => !!id
  }
})
