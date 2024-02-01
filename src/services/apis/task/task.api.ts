import axios from "axios";
import { createTask, updateTask } from "../../../common/interface";

export default {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/todo`)
    },
    create: async (data: createTask) => {
        return await axios.post(`${import.meta.env.VITE_SV_HOST}/todo`, data)
    },
    update: async (taskId: number, data: updateTask) => {
        return await axios.put(`${import.meta.env.VITE_SV_HOST}/todo/${taskId}`, data)
    },
    delete: async (taskId: number) => {
        return await axios.delete(`${import.meta.env.VITE_SV_HOST}/todo/${taskId}`)
    }
}