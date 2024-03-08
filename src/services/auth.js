import { subApiUrl } from "@/utils/constant";

const { auth, api } = subApiUrl;

const login = (req) => baseApi.post(`${api}/${auth}/signin`, req);

export { login };