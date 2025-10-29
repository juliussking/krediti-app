import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withXSRFToken = true
axios.defaults.withCredentials = true

import { errorMessage } from '@/utils/helpers'

axios.interceptors.response.use(
  function (response) {
    return response;
  }, 
  function (error) {
    // Se o servidor respondeu
    if (error.response && error.response.data) {
      const feedbackError = errorMessage(error.response.data.error)
      return Promise.reject({
        message: feedbackError,
        status: error.response.status
      });
    } 
    // Se não houve resposta (erro de rede, timeout etc.)
    else {
      return Promise.reject({
        message: 'Erro de rede ou servidor indisponível',
        status: 0
      });
    }
  }
);


export default axios