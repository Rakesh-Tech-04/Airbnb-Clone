import axios from 'axios'

export const api = axios.create({
    baseURL: "https://airbnb-clone-e05v.onrender.com/api",
    // baseURL: "http://localhost:4001/api",
    withCredentials: true,
})
