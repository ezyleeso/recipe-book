import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_API_DOMAIN,
});

export default instance;
