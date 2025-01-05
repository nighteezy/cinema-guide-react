import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cinemaguide.skillbox.cc',
  withCredentials: true,
});

axiosInstance.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.common['Accept'] = 'application/json';

export default axiosInstance;
