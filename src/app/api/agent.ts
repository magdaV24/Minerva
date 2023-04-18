import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5065/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function fromForm(value: any) {
  let formData = new FormData();
  for (const key in value) {
      formData.append(key, value[key])
  }
  return formData;
}

const MultiCards = {
  get: () => requests.get("MultiCards"),
  post: (values: any) => requests.post("MultiCards/create", fromForm(values)),
  put: (values: any) => requests.put("MultiCards", fromForm(values)),
  getPublicCategs: () => requests.get("MultiCards/publicCateg"),
  getPublicCards: (categ: string) => requests.get(`MultiCards/public/${categ}`),
  getCards: (categ: string) => requests.get(`MultiCards/categ/${categ}`),
  getUserCategs: (id: number) => requests.get(`MultiCards/privateCateg/${id}`),
  getLimitedCards: (categ:string, limit: number) => requests.get(`MultiCards/${categ}/${limit}`),
  getNumberOfCards: (categ: string) => requests.get(`MultiCards/count/${categ}`),
  getNumberOfPrivCards: (categ: string) => requests.get(`MultiCards/countPriv/${categ}`),
  deleteMultiCard: (id: number) => requests.delete(`MultiCards/${id}`)
};

const FlipCards = {
  get: () => requests.get("FlipCards"),
  post: (values: any) => requests.post("FlipCards/create", values),
  put: (values: any) => requests.put("FlipCards", fromForm(values)),
  delete: (id: number) => requests.delete(`FlipCards/${id}`),
  getPublicCategs: () => requests.get("FlipCards/publicCateg"),
  getCards: (categ: string) => requests.get(`FlipCards/categ/${categ}`),
  getPrivateCards: (categ: string) => requests.get(`FlipCards/private/${categ}`),
  getPublicCards: (categ: string) => requests.get(`FlipCards/public/${categ}`),
  getUserCategs: (id: number) => requests.get(`FlipCards/privateCateg/${id}`),
  getNumberOfCards: (categ: string) => requests.get(`FlipCards/count/${categ}`),
  getNumberOfPrivCards: (categ: string) => requests.get(`FlipCards/countPriv/${categ}`),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
  getUser: (id: number) => requests.get(`account/${id}`)
};

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const agent = { MultiCards, FlipCards, Account };

export default agent;
