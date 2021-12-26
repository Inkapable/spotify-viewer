import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Home from "./components/Home";
import Notifications from '@kyvg/vue3-notification'

const routes = [{
    path: '/:pathMatch(.*)*',
    component: Home
}]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
createApp(App).use(router).use(Notifications).mount('#app')
