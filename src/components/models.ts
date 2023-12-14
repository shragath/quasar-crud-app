export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

export interface ServerData {
    id: number;
    name: string;
    ip_address: string;
    status: boolean;
    description: string;
}
