import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import SettingView from './components/views/Setting.vue'
import ContentView from './components/views/Content.vue'
import ListSubjectView from './components/views/ListSubject.vue'
import AddSubjectView from './components/views/AddSubject.vue'
import TasksView from './components/views/Tasks.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

// Routes
const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/in',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Résumé des contenus et activités'}
      }, {
        path: 'subject',
        component: ContentView,
        children: [
          {
            path: 'list',
            alias: '',
            component: ListSubjectView,
            name: 'Contenus',
            meta: {description: 'Gestion des chapitres'}
          }, {
            path: 'add',
            component: AddSubjectView,
            name: 'Nouveau chapitre',
            meta: {description: 'Ajout de chapitre'}
          }
        ]
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Réglages',
        meta: {description: 'Page pour modifier les informations de profil'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
