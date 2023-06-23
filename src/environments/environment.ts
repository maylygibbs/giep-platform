// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name_system: 'GIEP',
  ttl: 28800000,
  apiUrl: 'https://bofficegiepstage.pafar.com.ve/public/api',
  apiAuth: 'https://bofficegiepstage.pafar.com.ve/public', 
  //apiUrl: 'https://giepboffice.pafar.com.ve/public/api',
  //apiAuth: 'https://giepboffice.pafar.com.ve/public',
  appUrl: 'http://localhost:4200',  
  wsserver:"https://wsplatformstage.pafar.com.ve",
  localstorage:{
    userKey : 'cusr'
  },
  form: {
    url: {
      validations: {
        pattern: '^(https?|http):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2,10}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?\'\\\\+&%$#=~_-]+))*$'
      }
    },
    password: {
      validations: {
        pattern: '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&.+=*]).*$',
      }
    },
    number: {
      validations: {
        pattern: '^[0-9]*$',
      }
    },
    alphanumeric: {
      validations: {
        pattern: '^[a-zA-Z0-9]*$',
      }
    },
    role_pattern:{
      validations: {
        pattern: '(ROLE)[A-Z\_]+',
      }
    },
    file_extension:['doc', 'docx', 'pdf','xls', 'xlsx', 'png', 'jpg', 'jpge'],
    file_imagen_extension:['png', 'jpg', 'jpge'],
    file_acordo_extension:['pdf'],
    file_extension_pdf: ['pdf'],
    file_extension_excel:['xls', 'xlsx']
  },
  paginator: {
    default_page: 1,
    row_per_page: 8
  },
  endpoints:{
    handle_error_blackList:[
      '/login_check',
      '/recovery-password',
      '/changepassword'
    ],
    handler_auth_whiteList:[
      '/recovery-password',
      '/changepassword'
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
