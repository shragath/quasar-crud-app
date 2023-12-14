import { makeFetchRequester, useVueUseAuthState } from '@vueauth/sanctum';
export const baseUrl = 'http://localhost';

export default {
    // baseUrl: 'http://localhost',
    /**
     * By default, Quasar Auth will make requests using Fetch.
     * If you want to use a different library for backend
     * requests you can provide an implemntation here.
     */
    requester: makeFetchRequester,

    /**
     * Quasar Auth uses "createGlobalState" from "vueuse" to store
     * the user. Feel free to use your own by implementing
     * the UseAuthState contract and passing it below.
     */
    useAuthState: useVueUseAuthState,

    /**
     * You may want to configure the endpoints Sanctum uses. We use
     * sensible defaults aligned with fortify, but you can of
     * course configure your own.
     */
    endpoints: {
        login: baseUrl + '/login',
        register: baseUrl + '/register',
        logout: baseUrl + '/logout',
        getUser: baseUrl + '/api/user',
        csrfCookie: baseUrl + '/sanctum/csrf-cookie',
        resetPassword: baseUrl + '/reset-password',
        forgotPassword: baseUrl + '/forgot-password',
        password: baseUrl + '/user/password',
    },
};
