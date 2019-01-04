import axios from 'axios'
import NProgress from 'nprogress'

// create a new axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8081/'
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  NProgress.start()
  return config;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  NProgress.done()
  return response;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
});

export default instance