import axios from "axios";

export default {
    findAll: async () => {
        return await axios.get(`http://127.0.0.1:3000/v1/todo`)
    },
    create: async (data: any) => {
        return await axios.post(`http://127.0.0.1:3000/v1/todo`, data)
    },
    update: async (taskId: any, data: any) => {
        return await axios.put(`http://127.0.0.1:3000/v1/todo/${taskId}`, data)
    },
    delete: async (taskId: any) => {
        return await axios.delete(`http://127.0.0.1:3000/v1/todo/${taskId}`)
    }
}