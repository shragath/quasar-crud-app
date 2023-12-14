import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/IndexPage.vue'),
                meta: { authOnly: true },
            },
        ],
        // name: 'dashboard',
    },
    // {
    //     path: '/',
    //     component: () => import('layouts/AuthenticatedLayout.vue'),
    //     children: [
    //         {
    //             path: '/dashboard',
    //             name: 'dashboard',
    //             component: () => import('src/pages/IndexPage.vue'),
    //             meta: { authOnly: true },
    //         },
    //     ],
    // },
    // {
    //   path: '/login',
    //   component: () => import('layouts/MainLayout.vue'),
    //   children: [{ path: '', component: () => import('auth/pages/IdentityPasswordLoginPage.vue') }],
    // },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
