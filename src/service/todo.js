import {baseApi} from '@/plugins/axios';

const api = '/api/todo'

const list = () => baseApi.get(`${api}`);
// CANT HANDLE
const add = (body) => baseApi.post(`${api}`, body);
const edit = (id, body) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export {list, add, edit, del}