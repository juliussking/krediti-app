import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withXSRFToken = true
axios.defaults.withCredentials = true

import { errorMessage } from '@/utils/helpers'

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const errorResponse = error.response
    
    const feedbackError = errorMessage(errorResponse.data.error)
    
    return Promise.reject({
        message: feedbackError,
        status: 400
    });
  });

export default axios