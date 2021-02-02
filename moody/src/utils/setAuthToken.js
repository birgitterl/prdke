import authService from './authService';
import searchService from './searchService';
import socialGraphService from './socialGraphService';

const setAuthToken = (token) => {
  if (token) {
    authService.defaults.headers.common['Authorization'] = token;
    socialGraphService.defaults.headers.common['Authorization'] = token;
    searchService.defaults.headers.common['Authorization'] = token;

    localStorage.setItem('token', token);
  } else {
    delete authService.defaults.headers.common['Authorization'];
    delete socialGraphService.defaults.headers.common['Authorization'];
    delete searchService.defaults.headers.common['Authorization'];

    localStorage.removeItem('token');
  }
};

export default setAuthToken;
