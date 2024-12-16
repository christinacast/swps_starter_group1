import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue'; // Home page
import MapsPage from '@/pages/MapsPage.vue'; // maps page
import ProfilePage from '@/pages/ProfilePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    {
        path: '/maps/:departure/:destination',  // Route mit Parametern für Abfahrts- und Zielort
        name: 'MapsPage',
        component: MapsPage,
        props: true,  // Übergibt die Parameter als Props an MapsPage
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue'),
    },
    { path: '/profile', name: 'Profil', component: ProfilePage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
