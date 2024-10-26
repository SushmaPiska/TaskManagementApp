import axios from 'axios'

export const getAllBacklogTasks=()=>{
    const tasks=axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/getAllBacklogTasks`)

    return tasks;
}
export const getAllToDoTasks=()=>{
    const tasks=axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/getAllToDoTasks`)

    return tasks;
}
export const getAllInProgressTasks=()=>{
    const tasks=axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/getAllInProgressTasks`)

    return tasks;
}
export const getAllDoneTasks=()=>{
    const tasks=axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/getAllDoneTasks`)

    return tasks;
}

