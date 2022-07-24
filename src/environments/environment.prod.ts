export const environment = {
  production: true,
  ttl: 600000,
  name_system: 'GIEP',
  apiUrl: 'https://giepboffice.pafar.com.ve/public/api',
  localstorage:{
    userKey : 'cusr'
  },
  endpoints:{
    handle_error_blackList:[
      '/login_check',
    ]
  }
};