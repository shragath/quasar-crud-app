<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img
                            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                        />
                    </q-avatar>
                    Server Info
                </q-toolbar-title>
                <q-btn
                    dense
                    flat
                    round
                    icon="logout"
                    label="Desconectar"
                    @click="onLogoutClicked"
                />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
            <!-- drawer content -->
            <label>Links</label>
        </q-drawer>

        <q-page-container
            class="bg-grey-2"
            style="height: 100%; min-height: 100vh"
        >
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import router from 'src/router';
import { ref } from 'vue';
import useLogout from 'auth/composables/useLogout';

export default {
    setup() {
        const leftDrawerOpen = ref(false);
        const {  onLogoutClicked } = useLogout();

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            logOut() {
                router.push('/logout');
            },
            onLogoutClicked,
        };
    },
};
</script>
