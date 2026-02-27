import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BackButton } from '../components/BackButton'
import Box from "@mui/material/Box"
import CardMedia from '@mui/material/CardMedia';
import { FunctionalityButton } from '../components/FunctionalityButton'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from "../util/axios"
import { useUser } from '../util/UserContext';

export const Page3 = () => {
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let [data, setData] = useState({})
    let [preImage, setPreImage] = useState([])
    let { getValues } = useFormContext()
    let { user } = useUser()
    useEffect(() => {
       
        setData(getValues())
        let img = getValues().image
        if (img) {
            const urls = (img).map(item => URL.createObjectURL(item[0]))
            setPreImage(urls)
        }
    }, [])
    const handleButton = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            let imageUrl = (Array.from(data.image).map((img) => {
                let formData = new FormData()
                formData.append('file', img[0])
                formData.append('upload_preset', "airbnb_clone")
                formData.append('cloud_name', 'dznrdjvbj')

                return axios.post("https://api.cloudinary.com/v1_1/dznrdjvbj/image/upload", formData).then(({ data }) => { return { url: data.url, publicId: data.public_id } })
            }))
            let image = await Promise.all(imageUrl)
            let updateValue = { ...data, image, user: user.id }
            await api.post('/listing', updateValue).then(() => {
                navigate('/listing')
            }).catch((err) => { console.log(err) })
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Box sx={{ margin: '1rem 1rem 0rem 1rem' }}>
                <BackButton />
            </Box>
            <Box sx={{ display: 'grid', placeContent: 'center', padding: '1rem 1rem' }}>
                <Box sx={{ fontSize: '2rem' }}>{data.city},{data.landmark}</Box>
                <Box sx={{
                    marginBlock: '1rem', display: 'grid',
                    gap: 1, gridTemplateColumns: { xs: 'repeat(2,40vw)', md: 'repeat(5,15vw)' }, gridTemplateRows: { xs: 'repeat(2,20vh)', sm: 'repeat(2,30vh)', md: 'repeat(2,25vh)' }
                }}>
                    <CardMedia
                        sx={{ gridColumn: { xs: '1/3', md: '1/4' }, gridRow: { xs: '1/2', md: '1/3' } }}
                        image={preImage[0]}
                        title="green iguana"
                    />
                    <CardMedia
                        sx={{ gridColumn: { xs: '1/2', md: '4/6' } }}
                        image={preImage[1]}
                        title="green iguana"
                    />
                    <CardMedia
                        sx={{ gridColumn: { xs: '2/3', md: '4/6' } }}
                        image={preImage[2]}
                        title="green iguana"
                    />
                </Box>
                <Box sx={{ fontSize: '1.7rem' }}>{data.title}</Box>
                <Box sx={{ fontSize: '1.7rem' }}>{data.description}</Box>
                <Box sx={{ fontSize: '1.7rem', marginTop: '0.7rem' }}>Rs.{data.rent}/day
                </Box>
                <FunctionalityButton isSubmitting={isLoading} title={"Add Listing"} loadingTitle={'Adding....'} onClick={handleButton} />
            </Box>
        </>
    )
}
