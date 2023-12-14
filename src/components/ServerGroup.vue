<template>
    <div
        class="q-pa-md col-3"
        style="
            height: 18rem;
            margin-bottom: 0px;
            min-height: 18rem;
            max-height: 18rem;
        "
        v-for="server in servers"
        :key="server.id"
    >
        <ServerCard
            :id="server.id"
            :title="server.name"
            :ip_address="server.ip_address"
            :status="server.status"
            :description="server.description"
        ></ServerCard>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ServerData } from './models';
import ServerCard from './ServerCard.vue';

export default defineComponent({
    name: 'RenderServers',
    components: { ServerCard },
    props: {
        id: {
            type: Number,
            default: 1,
        },
        group_name: {
            type: String,
            default: 'Servers 1',
        },
        servers: {
            type: Array as PropType<ServerData[]>,
            default: () => [],
        },
    },
});
</script>
