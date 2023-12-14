import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ServerData } from '../components/models';
import { baseUrl } from '../../config/sanctum';
export const useServersStore = defineStore('servers', {
    state: () => ({
        servers: [
            {
                id: 1,
                name: 'Server 1',
                ip_address: '123.456.789.256',
                status: true,
                description: 'Server 1 description',
            },
        ] as ServerData[],
    }),

    getters: {
        getNewServer(state) {
            return state.servers[state.servers.length - 1];
        },
        getServerById(state) {
            return (id: number) =>
                state.servers.find((server) => server.id === id);
        },
    },

    actions: {
        createServer() {
            const newServerId = -1 * this.servers.length - 1;
            this.servers.push({
                id: newServerId,
                name: '',
                ip_address: '',
                status: false,
                description: '',
            } as ServerData);
        },
        cancelNewServer() {
            this.servers.pop();
        },
        findServerById(id: number) {
            return this.servers.find((server) => server.id === id);
        },
        deleteServer(id: number) {
            this.servers = this.servers.filter((server) => server.id !== id);
        },
        async setServers() {
            try {
                const pathUrl = baseUrl + '/api/servers';
                const response = await api.get(pathUrl);
                this.servers = response.data;
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        },
        async addServerBD() {
            try {
                const pathUrl = baseUrl + '/api/servers';
                const newServer = this.getNewServer;
                const response = await api.post(pathUrl, newServer);
                if (response.data) {
                    newServer.id = response.data.id;
                    newServer.status = response.data.status;
                }
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        },
        async updateServerBD(id: number) {
            try {
                const pathUrl = baseUrl + '/api/servers/' + id;
                const editedServer = this.findServerById(id);
                const response = await api.put(pathUrl, editedServer);
                if (response.data) {
                    if (editedServer) {
                        editedServer.status = response.data.status;
                    }
                }
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        },
        async deleteServerBD(id: number) {
            try {
                const pathUrl = baseUrl + '/api/servers/' + id;
                await api.delete(pathUrl);
            } catch (e) {
                console.log(e);
            }
        },
    },
});
