import Box from "@mui/material/Box"
import { BackButton } from "../components/BackButton"
import { styled } from '@mui/material/styles';
import { FunctionalityButton } from "../components/FunctionalityButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../util/axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useUser } from "../util/UserContext";

export const Authentication = () => {
    let navigate = useNavigate()
    let { setUser } = useUser()
    let [show, setShow] = useState(false)
    let { register, handleSubmit, reset } = useForm()
    let [authTitle, setAuthTitle] = useState('Login')
    let InputField = styled('input')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid #ccc',
        borderRadius: "5px",
        width: '90vw',
        marginBottom: '0.3rem',
        [theme.breakpoints.up('md')]: {
            width: '40rem'
        }
    }))
    let Label = styled('p')({
        fontSize: '1.3rem',
        marginBlock: '0.5rem'
    })
    const changeAuth = () => {
        setAuthTitle(prev => prev === 'Login' ? "Sign Up" : "Login")
        reset()
    }
    const onSubmit = async (data) => {
        let url = authTitle === 'Login' ? "/user/login" : "/user/signup"
        api.post(url, data).then(({ data }) => {
            setUser(data)
            navigate(-1)
        })
    }
    return (
        <>
            <Box sx={{ margin: '1rem 2rem' }}>
                <BackButton authSection={true} />
            </Box>
            <Box sx={{
                display: 'flex',
                padding: '1rem',
                minHeight: '80vh',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Welcome to Airbnb</h1>
                    {authTitle === 'Login' ? null : <Box>
                        <Label>Name</Label>
                        <InputField {...register('name')} type="text" placeholder="Name" required />
                    </Box>}

                    <Box>
                        <Label>Email</Label>
                        <InputField {...register('email')} type="email" placeholder="Email" required />
                    </Box>
                    <Box sx={{ position: 'relative', width: { md: "40rem" } }}>
                        <Label>Password</Label>
                        <InputField {...register('password')} type={show ? "text" : 'password'} placeholder="Password" required />
                        {!show ?
                            <VisibilityIcon onClick={() => setShow(prev => !prev)} sx={{
                                position: 'absolute',
                                right: 10,
                                marginTop: '0.4rem',
                                cursor: 'pointer',
                            }} /> :
                            <VisibilityOffIcon
                                onClick={() => setShow(prev => !prev)} sx={{
                                    position: 'absolute',
                                    right: 10,
                                    marginTop: '0.4rem',
                                    cursor: 'pointer'

                                }} />}
                    </Box>
                    <FunctionalityButton title={authTitle} />
                    <Box>Create new account <span onClick={changeAuth} style={{ color: 'red', cursor: 'pointer' }}>{authTitle == 'Login' ? 'Sign Up' : 'Login'}</span></Box>
                </form>
            </Box>
            {/* </Box > */}
        </>
    )
}
