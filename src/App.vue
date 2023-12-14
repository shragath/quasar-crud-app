<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import authenticateRoutes from './router/authenticateRoutes';

export default defineComponent({
    name: 'App',
    setup() {
        authenticateRoutes();
    },
});
</script>
