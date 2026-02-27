import { FormProvider, useForm } from 'react-hook-form'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../util/UserContext'

export const AddListingLayout = () => {
    let method = useForm()
    let { user } = useUser()
    return (
        <FormProvider {...method}>
            {user ? <Outlet /> : <Navigate to={'/user/authentication'} replace />}
        </FormProvider>
    )
}
