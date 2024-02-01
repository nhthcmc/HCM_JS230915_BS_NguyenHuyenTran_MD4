export type Status = 'completed' | 'uncompleted';

export interface Task {
    id: number,
    name: string,
    status: Status
}
export interface updateTask {
    name: string,
    status: Status
}
export interface createTask {
    name: string
}