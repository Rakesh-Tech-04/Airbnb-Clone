import { FormProvider, useForm } from 'react-hook-form'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../util/UserContext'
import { useEffect } from 'react'

export const AddListingLayout = () => {
    let method = useForm()
    let { user, loading } = useUser()

    return (
        <FormProvider {...method}>
            {loading ? <div>Loading...</div> : (user ? <Outlet /> : <Navigate to={'/user/authentication'} />)}

            {/* <Outlet /> */}
        </FormProvider>
    )
}
