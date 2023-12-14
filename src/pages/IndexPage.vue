<template>
    <q-page class="row full-height" style="overflow: hidden; min-height: 100%">
        <div
            class="full-width full-height row wrap justify-start items-start content-start bg-grey-5 no-wrap"
        >
            <div class="col-12 text-right q-mt-md">
                <!-- Opciones -->
                <AddServer></AddServer>
            </div>
        </div>
        <div
            class="full-width row items-start content-start"
            style="overflow: hidden; min-height: 100%"
        >
            <RenderServers :servers="servers"></RenderServers>
        </div>
    </q-page>
</template>

<script lang="ts">
import RenderServers from 'src/components/ServerGroup.vue';
import { defineComponent } from 'vue';
import AddServer from 'src/components/AddServerButton.vue';
import { useServersStore } from 'src/stores/servers';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'IndexPage',
    components: { RenderServers, AddServer },
    setup() {
        const store = useServersStore();
        const { servers } = storeToRefs(store);
        return { servers, serversTimers: {} as NodeJS.Timeout };
    },
    beforeMount() {
        const store = useServersStore();
        const { setServers } = store;
        setServers();
        this.serversTimers = setInterval(() => {
            setServers();
        }, 300000);
    },
    beforeUnmount() {
        clearInterval(this.serversTimers);
    },
});
</script>
