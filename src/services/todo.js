import { baseApi } from '@/plugins/axios'

const api = '/api/todo'

const list = () => baseApi.get(`${api}`)
const add = (body) => baseApi.post(`${api}`, body)

export { list, add }
