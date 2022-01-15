import {
    createRouter,
    createWebHistory
} from "vue-router";

import Home from "@/views/Home"

const history = createWebHistory(process.env.BASE_URL);

const routes = [{
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
]

const router = createRouter({
    history,
    routes,
})

export default router