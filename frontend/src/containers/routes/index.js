export const Routes = {
  HOME: {
    path: '/',
    allowedRoles: ['requestant', 'approver', 'driver', 'admin']
  },
  LOGIN: {
    path: '/login'
  },
  PASSWORD_RESET: {
    path: '/password-reset'
  },
  PASSWORD_RESET_NEW: {
    path: '/password-reset/:id/:token'
  },
  REGISTER: {
    path: '/register'
  },
  REQUISITION_DETAIL: {
    path: '/req/:id',
    allowedRoles: ['requestant', 'approver', 'driver']
  },
  TEMPLATE_DETAIL: {
    path: '/temp/:id',
    allowedRoles: ['requestant']
  },
  USER_DETAIL: {
    path: '/user/:id',
    allowedRoles: ['admin']
  },
  CAR_DETAIL: {
    path: '/car/:id',
    allowedRoles: ['admin']
  },
  REQUISITION: {
    path: '/req',
    allowedRoles: ['requestant']
  },
  TEMPLATE: {
    path: '/temp',
    allowedRoles: ['requestant']
  },
  USER: {
    path: '/user',
    allowedRoles: ['admin']
  },
  CAR: {
    path: '/car',
    allowedRoles: ['admin']
  },
  REASON: {
    path: '/reason',
    allowedRoles: ['admin']
  },
  DESTINATION: {
    path: '/dest',
    allowedRoles: ['admin']
  },
  EXPORT: {
    path: '/export',
    allowedRoles: ['approver']
  },
  TEMPLATES: {
    path: '/temps',
    allowedRoles: ['requestant']
  },
  REQUISITIONS: {
    path: '/reqs',
    allowedRoles: ['requestant', 'approver', 'driver']
  },
  USERS: {
    path: '/users',
    allowedRoles: ['admin']
  },
  CARS: {
    path: '/cars',
    allowedRoles: ['admin']
  },
  REASONS: {
    path: '/reasons',
    allowedRoles: ['admin']
  },
  DESTINATIONS: {
    path: '/dests',
    allowedRoles: ['admin']
  },
  AUTHS: {
    path: '/auths',
    allowedRoles: ['admin']
  },
  AUTH_DETAIL: {
    path: '/auth/:id',
    allowedRoles: ['admin']
  },
  CALENDAR: {
    path: '/calendar',
    allowedRoles: ['requestant', 'approver', 'driver']
  },
  STATISTICS: {
    path: '/statistics',
    allowedRoles: ['approver']
  }
}
