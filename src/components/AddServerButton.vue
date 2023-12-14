<template>
    <q-btn
        class="q-mx-xl"
        size="lg"
        round
        color="secondary"
        icon="post_add"
        @click="useClickAddServer()"
    >
        <q-tooltip>Agregar nuevo servidor</q-tooltip>
    </q-btn>
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Nombre del servidor</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input
                    dense
                    v-model="server.name"
                    autofocus
                    placeholder="Nombre del servidor"
                    maxlength="30"
                    @keyup.enter="prompt = false"
                />
                <q-input
                    dense
                    v-model="server.ip_address"
                    placeholder="IP Address"
                    maxlength="15"
                    @keyup.enter="prompt = false"
                />
                <q-input
                    dense
                    v-model="server.description"
                    placeholder="Descripcion"
                    maxlength="100"
                    @keyup.enter="prompt = false"
                />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn
                    flat
                    label="Cancel"
                    @click="cancelNewServer()"
                    v-close-popup
                />
                <q-btn flat label="Agregar server" @click="saveServer" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script lang="ts">
import { useServersStore } from 'src/stores/servers';
import { defineComponent, PropType, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ServerData } from './models';

export default defineComponent({
    name: 'AddServer',
    props: {
        modServer: { type: Object as PropType<ServerData> },
    },
    setup() {
        const store = useServersStore();
        const { getNewServer } = storeToRefs(store);
        const server = getNewServer;
        const prompt = ref(false);
        const { cancelNewServer, createServer, addServerBD } = store;
        function useClickAddServer() {
            createServer();
            prompt.value = true;
        }
        function saveServer() {
            addServerBD();
            prompt.value = false;
        }

        return {
            prompt,
            server,
            useClickAddServer,
            cancelNewServer,
            saveServer,
        };
    },
});
</script>
