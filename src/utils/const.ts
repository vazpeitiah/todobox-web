export const routes = {
  about: '/about',
  root: '/',
  tasks: {
    root: '/tasks',
    new: '/tasks/new',
    status: '/tasks/status'
  },
  login: '/login',
  signUp: '/sign-up',
  profile: '/profile'
}

export const qk = {
  tasks: {
    get: 'tasks'
  }
}

export const STALE_TIME = 1000 * 60 * 5 /* (Milliseconds) = Five minutes */
