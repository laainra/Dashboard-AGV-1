import axios from 'axios';
import { baseApiUrl } from "@/utils/constant";

const login = (req) => axios.post(`${baseApiUrl}/auth/signin`, req);

export { login };