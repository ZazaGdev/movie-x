import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateCollection from '../views/Collections/CreateCollection.vue'
import CollectionDetails from '../views/Collections/CollectionDetails.vue'
import UserCollections from '../views/Collections/UserCollections.vue'

// Route guard
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser

    if (!user) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        beforeEnter: requireAuth,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/collections/create',
        name: 'CreateCollection',
        component: CreateCollection,
        beforeEnter: requireAuth,
    },
    {
        path: '/collections/:id',
        name: 'CollectionDetails',
        component: CollectionDetails,
        beforeEnter: requireAuth,
        props: true,
    },
    {
        path: '/collections/user',
        name: 'UserCollections',
        component: UserCollections,
        beforeEnter: requireAuth,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
