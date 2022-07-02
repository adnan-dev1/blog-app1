import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers['x-auth-token'] =  token;

  return config;
});

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (expectedError) {
    console.log(error);
    toast.error(error.response.data);
  } else {
    toast.error('An unexpected error occurrred.');
  }

  return Promise.reject(error);
});


const axiosMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default axiosMethods;
