import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Inicio',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Administación',
    isTitle: true
  },
  {
    label: 'Usuaios',
    icon: 'users',
    subItems: [
      {
        label: 'Listado',
        link: '/users',
      }
    ]
  },
  {
    label: 'Roles de seguridad',
    icon: 'users',
    subItems: [
      {
        label: 'Ver roles',
        link: '/users',
      },
      {
        label: 'Niveles de acceso',
        link: '/users',
      }
    ]
  },

  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    }
  },
  {
    label: 'GIEP',
    isTitle: true
  },
  {
    label: 'Proyectos',
    icon: 'briefcase',
    subItems: [
      {
        label: 'Ver proyectos',
        link: '/projects',
      }
    ]
  },
  {
    label: 'Documentos',
    icon: 'anchor',
    subItems: [
      {
        label: 'Cropper',
        link: '/advanced-ui/cropper',
      },
    ]
  },
  {
    label: 'Reportes',
    icon: 'bar-chart',
    subItems: [
      {
        label: 'Basic elements',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Editors',
        link: '/form-elements/editors'
      },
      {
        label: 'Wizard',
        link: '/form-elements/wizard'
      },
    ]
  }
];
