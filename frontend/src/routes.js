import App from './App'
import Home from './components/marketing/Home'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import About from './components/marketing/About'

export default [
    {
        path: '/todo',
        name: 'todo',
        component: App,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
]