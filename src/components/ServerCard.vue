<template>
    <q-card
        flat
        bordered
        class="my-card shadow-11 full-height"
        :class="$q.dark.isActive ? 'bg-grey-9' : ''"
    >
        <q-card-section>
            <div class="row items-center no-wrap">
                <div class="col">
                    <div class="text-h6">{{ title }}</div>
                    <div class="text-subtitle2">{{ ip_address }}</div>
                    <div class="text-subtitle3">
                        <q-badge
                            outline
                            :color="status ? 'green' : 'red'"
                            :label="status ? 'Online' : 'Offline'"
                        />
                        <!-- {{ status ? 'Online' : 'Offline' }} -->
                    </div>
                </div>

                <div class="col-auto">
                    <q-btn color="grey-7" round flat icon="more_vert">
                        <q-menu cover auto-close>
                            <q-list>
                                <q-item clickable @click="removeServer">
                                    <q-item-section>Remove Card</q-item-section>
                                </q-item>
                                <q-item clickable @click="clickEdit">
                                    <q-item-section>Edit</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </div>
        </q-card-section>

        <q-card-section>
            {{ description }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat>Check status</q-btn>
            <!-- <q-btn flat>Action 2</q-btn> -->
        </q-card-actions>
    </q-card>

    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Nombre del servidor</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input
                    dense
                    v-model="editServer.name"
                    autofocus
                    placeholder="Nombre del servidor"
                    maxlength="30"
                    :rules="[(val) => !!val || 'Field is required']"
                />
                <q-input
                    dense
                    v-model="editServer.ip_address"
                    placeholder="IP Address"
                    maxlength="15"
                    :rules="[(val) => !!val || 'Field is required']"
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
                <q-btn flat label="Editar server" @click="saveEditedServer" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { useServersStore } from 'src/stores/servers';
import { defineComponent, ref } from 'vue';
import { ServerData } from './models';

function editActions(id: number) {
    const store = useServersStore();
    const prompt = ref(false);
    const { findServerById, deleteServer, updateServerBD, deleteServerBD } = store;
    const editServer = findServerById(id) ?? ({} as ServerData);

    let server = {} as ServerData;

    function clickEdit() {
        server = {
            id: editServer.id,
            name: editServer.name,
            ip_address: editServer.ip_address,
            description: editServer.description,
        } as ServerData;
        prompt.value = true;
    }

    function updateEditedServer() {
        updateServerBD(id);

        prompt.value = false;
        // const editServer = findServerById(id) ?? ({} as ServerData);
        // editServer.title = server.title;
        // editServer.ip_address = server.ip_address;
        // editServer.description = server.description;
    }

    function cancelEdit() {
        editServer.name = server.name;
        editServer.ip_address = server.ip_address;
        editServer.description = server.description;

        resetServer();
    }

    function removeServer() {
        deleteServerBD(id);
        deleteServer(id);
    }

    function resetServer() {
        server = {} as ServerData;
    }

    return {
        prompt,
        editServer,
        clickEdit,
        saveEditedServer: updateEditedServer,
        cancelEdit,
        removeServer,
    };
}

export default defineComponent({
    name: 'ServerCard',
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            default: 'Lorem ipsum dolor sit amet',
        },
        ip_address: {
            type: String,
            default: '1.1.1.1',
        },
        status: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptates.',
        },
    },
    setup(props) {
        return {
            ...editActions(props.id),
        };
    },
});
</script>
