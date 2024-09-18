import axios from 'axios';

import { baseURL } from '../constants/constants';
import { store } from '../store/store';
import { clearUser } from '../store/slices/userSlice';
import ToastService from './toast.service';

const UNAUTHORIZED = 401;

axios.defaults.withCredentials = false;

// Add a request interceptor
axios.interceptors.request.use(
  function (config: any) {
    const { user } = store.getState().user;

    let token = user?.token;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'multipart/form-data';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      // store.dispatch(clearUser());
      // ToastService.showErrorMessage('Session expired!');
    }

    return Promise.reject(error);
  }
);

export const getBaseRoute = (route: string) => {
  return `${baseURL}${route}`;
};

// Base function for GET requests
const get = async (url: string, params = {}) => {
  return axios({
    method: 'get',
    url,
    params,
  });
};

// Base function for POST requests
const post = async (url: string, data = {}) => {
  return axios({
    method: 'post',
    url,
    data,
  });
};

// Base function for PATCH requests
const patch = async (url: string, data = {}) => {
  return axios({
    method: 'patch',
    url,
    data,
  });
};

// Base function for PUT requests
const put = async (url: string, data = {}) => {
  return axios({
    method: 'put',
    url,
    data,
  });
};

// Base function for DELETE requests
const remove = async (url: string) => {
  return axios({
    method: 'delete',
    url,
  });
};

export { get, post, patch, put, remove };
