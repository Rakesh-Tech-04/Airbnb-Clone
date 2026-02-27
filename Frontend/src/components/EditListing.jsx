import Box from '@mui/material/Box';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FunctionalityButton } from './FunctionalityButton';
import { api } from '../util/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import { LogoButton } from './LogoButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '80vh',
    color: 'white',
    background: '#302e2e',
    boxShadow: 24,
    py: '1rem',
    paddingInline: '3rem 6rem',
    borderRadius: '10px',
    overflowX: 'auto',

};
export const EditListing = ({ listing, setListing, handleClose }) => {
    let { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    let [isDeleting, setIsDeleting] = React.useState(false)
    let navigate = useNavigate()
    React.useEffect(() => {
        if (listing && Object.keys(listing).length > 0) {
            reset({
                title: listing.title,
                description: listing.description,
                rent: listing.rent,
                city: listing.city,
                landmark: listing.landmark
            })
        }
    }, [listing])
    let InputField = styled('input')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid #ccc',
        borderRadius: "5px",
        width: '50vw',
        marginBottom: '0.3rem',
        [theme.breakpoints.up('md')]: {
            width: '40rem'
        }
    }))
    let TextArea = styled('textarea')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid black',
        borderRadius: "5px",
        width: '50vw',
        marginBottom: '0.3rem',
        [theme.breakpoints.up('md')]: {
            width: '40rem'
        }
    }))
    let Label = styled('p')({
        fontSize: '1.3rem',
        marginBlock: '0.5rem'
    })
    const onSubmit = async (data) => {
        let imageUrl = (Array.from(data.image).map((img, i) => {
            if (img[0]) {
                let formData = new FormData()
                formData.append('file', img[0])
                formData.append('upload_preset', "airbnb_clone")
                formData.append('cloud_name', 'dznrdjvbj')
                return axios.post("https://api.cloudinary.com/v1_1/dznrdjvbj/image/upload", formData).then(({ data }) => { return { url: data.url, publicId: data.public_id } })
            }
            else {
                return listing.image[i]
            }
        }))
        let image = await Promise.all(imageUrl)
        handleClose()
        let updateValue = { ...data, image }
        api.put(`/listing/${listing._id}`, updateValue).then(({ data }) => {
            setListing(data)
        }).catch((err) => {
            if (err.status === 401) {
                navigate('/user/authentication')
            }
        })
    }
    const handleDelete = async (listingId) => {
        if (isDeleting) return
        setIsDeleting(true)
        try {
            await api.delete(`/listing/${listingId}`).then(() =>
                navigate("/listing")
            ).catch((err) => {
                if (err.status === 401) {
                    navigate('/user/authentication')
                }
            })
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBlock: '2rem',
            marginInline: '0.8rem'
        }}>
            <CloseIcon onClick={handleClose} sx={{
                background: 'red',
                borderRadius: '50%',
                width: "35px",
                height: "35px",
                padding: '4px',
                cursor: 'pointer',
            }} />
            <form onSubmit={handleSubmit(onSubmit)} style={style}>
                <Box>
                    <Label>Title</Label>
                    <InputField {...register("title")} placeholder="Title" required />
                </Box>
                <Box>
                    <Label>Description</Label>
                    <TextArea {...register("description")} placeholder="Description" rows={3} />
                </Box>
                <Box>
                    <Label>Image1</Label>
                    <InputField {...register('image.0')} type="file" />
                </Box>
                <Box>
                    <Label>Image2</Label>
                    <InputField {...register('image.1')} type="file" />
                </Box>
                <Box>
                    <Label>Image3</Label>
                    <InputField {...register('image.2')} type="file" />
                </Box>
                <Box>
                    <Label>Rent</Label>
                    <InputField required type="number" min={1000} {...register("rent")} placeholder="Rent._/day" />
                </Box>
                <Box>
                    <Label>City</Label>
                    <InputField required {...register("city")} placeholder="City" />
                </Box>
                <Box>
                    <Label>Landmark</Label>
                    <InputField required {...register("landmark")} placeholder="Landmark" />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <FunctionalityButton title={"Edit Listing"} loadingTitle={"Update...."} type={'submit'} isSubmitting={isSubmitting} />
                    <FunctionalityButton title={"Delete Listing"} loadingTitle={"Delete...."} isSubmitting={isDeleting} onClick={() => handleDelete(listing._id)} type={'button'} />
                </Box>
            </form>

            <LogoButton title={"Update your detail"} />
        </Box>
    )
}
