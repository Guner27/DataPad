// config.js
const config = {
    API_BASE_URL: 'http://api.hudayihancerli.com', // Temel API URL
    endpoints: {
      CATEGORY:'/Categorys',
      GET_CATEGORIES: '/Categorys/AllCategories',           // CRUD operasyonları için uç noktalar
      USERS:'/Users',
      USERS_UPDATE:'/Users/UpdateUser',
      USERS_DELETE:'/Users/DeleteUser',
      USERS_LOGIN:'/Users/Login',
      PRODUCTS:'/Products',
      PRODUCTS_GET_ALL:'/Products/AllProductsByUserId',
      USER_REQUEST_PASSWORD_RESET: '/Users/RequestPasswordReset',
      USER_RESET_PASSWORD:'/Users/ResetPassword',
      USER_REGISTER : '/Users/Register',
    },
  };

  export default config;
