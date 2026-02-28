import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BackButton } from '../components/BackButton'
import Box from "@mui/material/Box"
import CardMedia from '@mui/material/CardMedia';
import { FunctionalityButton } from '../components/FunctionalityButton'
import { useNavigate } from 'react-router-dom';
import { api } from "../util/axios"

export const Page3 = () => {
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let [data, setData] = useState({})
    let [preImage, setPreImage] = useState([])
    let { getValues } = useFormContext()

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
            console.log(data.image)
            let formData = new FormData();
            (data.image).forEach(img =>
                formData.append('images', img[0])
            )
            let { image, ...newData } = data
            formData.append("data", JSON.stringify(newData))
            await api.post('/listing', formData).then(() => {
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
