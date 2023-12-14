<script lang="ts">
// import { ref } from 'vue';
import { ServerData } from './models';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ServerModal',
    props: {
        prompt: {
            type: Boolean,
            default: false,
        },
        server: {
            type: Object as PropType<ServerData>,
        },
    },
});
</script>

<template>
    <q-dialog v-model="props.prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Nombre del servidor</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input
                    dense
                    v-model="props.server.title"
                    autofocus
                    placeholder="Nombre del servidor"
                    maxlength="30"
                    :rules="[(val: string) => !!val || 'Field is required']"
                />
                <q-input
                    dense
                    v-model="editServer.ip_address"
                    placeholder="IP Address"
                    maxlength="15"
                    :rules="[(val: string) => !!val || 'Field is required']"
                />
                <q-input
                    dense
                    v-model="editServer.description"
                    placeholder="Descripcion"
                    maxlength="100"
                />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup @click="cancelEdit" />
                <q-btn
                    flat
                    label="Editar server"
                    v-close-popup
                    @click="saveEditedServer"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
