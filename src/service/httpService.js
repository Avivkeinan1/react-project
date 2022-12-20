import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;
export function setHeaders(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

const HttpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
export default HttpService;
