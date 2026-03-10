import axios from 'axios'

export const api = axios.create({
    baseURL: "https://airbnb-clone-e05v.onrender.com/api/v1",
    withCredentials: true,
})
