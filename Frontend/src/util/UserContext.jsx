import { useEffect } from 'react'
import { useState } from 'react'
import { useContext, createContext } from 'react'
import { api } from './axios'

let UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    useEffect(() => {

        api.get('/user/authStatus')
            .then(({ data }) => {
                console.log(data)
                setUser(data)
            })
            .catch(() => { setUser(null) })
            .finally(() => { setLoading(false) })

    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}