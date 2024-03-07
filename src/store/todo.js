import { defineStore } from 'pinia'

import * as s$todo from '@/service/todo'

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
    async a$edit({ id, data }) {
      try {
        await s$todo.edit(id, data);
        await this.a$list();
      } catch ({ message, error }) {
        throw message ?? error;
      }
    },
    async a$delete(id) {
      try {
        await s$todo.del(id);
        await this.a$list();
      } catch ({ message, error }) {
        throw message ?? error;
      }
    },
  },
  getters: {
    getList: (state) => state.list,
    getDetail: ({ list }) => {
      return (index) => list[index]
    }
  }
})