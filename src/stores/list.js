import { defineStore } from 'pinia'

import * as s$todo from '@/services/todo'

export const useListStore = defineStore({
  id: 'list',
  // state is same as data in options api
  state: () => ({
    list: []
  }),
  actions: {
    async a$list() {
      try {
        // object destructure
        const { data } = await s$todo.list()
        this.list = data
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    async a$add(data) {
      try {
        await s$todo.add(data)
        await this.a$list()
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    removeIndex(index) {
      this.list = this.list.filter((val, idx) => index !== idx)
    },
    editIndex(index, data) {
      this.list[index] = data
    }
  },
  getters: {
    getList: ({ list }) => list,
    getDetail: ({ list }) => {
      return (index) => list[index]
    }
  }
})
