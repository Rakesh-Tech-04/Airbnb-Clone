import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { FunctionalityButton } from '../components/FunctionalityButton'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { api } from '../util/axios'
import Rating from '@mui/material/Rating';
import Container from "@mui/material/Container"
import { toast } from 'react-toastify'


export const BookingConfirmation = () => {
    let navigate = useNavigate()
    let params = useParams()
    let [bookingDetail, setBookingDetail] = useState({})
    const [rating, setRating] = React.useState(3);
    const [comment, setComment] = useState("")

    let BookingDetail = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        marginBlock: '1.5rem'
    })
    useEffect(() => {
        api.get(`listing/booking/${params.bookingId}`).then(({ data }) => {
            setBookingDetail(data)
        })
    }, [])

    const handleClick = () => {
        navigate('/listing')
    }
    let handleReview = () => {
        let data = {
            rating, comment
        }
        api.post(`/listing/${bookingDetail.listing}/review`, data)
            .then(({ data }) => {
                setComment('')
                toast.success(data.message)
                navigate('/listing')
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })
    }


    return (
        <Box sx={{
            maxWidth: '100vw',
            backgroundColor: '#cfcfcfcc',
        }}>
            <Box sx={{ display: "flex", justifyContent: 'end' }}>
                <FunctionalityButton title={'Back to Home'} onClick={handleClick} />
            </Box>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{ backgroundColor: 'white', textAlign: 'center', width: { xs: '80vw', md: '30rem' }, padding: '3rem 1rem', borderRadius: '5px' }}>
                    <img src="https://1000logos.net/wp-content/uploads/2025/03/green-check-mark.png" alt="" height={'90rem'} />
                    <h5 style={{
                        fontSize: '1.4rem', marginBlock: '0.3rem 1rem'
                    }}>Booking Confirmed</h5>
                    <BookingDetail>
                        <p>Booking Id:</p>
                        <p>{bookingDetail._id}</p>
                    </BookingDetail>
                    <BookingDetail>
                        <p>Owner Details:</p>
                        <p>{bookingDetail.host?.email}</p>
                    </BookingDetail>
                    <BookingDetail>
                        <p>Total Rent:</p>
                        <p>{bookingDetail.totalPrice}</p>
                    </BookingDetail>
                </Box>
                <Box>

                </Box>
            </Box>

            <Container sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                mx: "auto",
            }}>
                <Box sx={{
                    '& > legend': { mt: 2 }, border: '2px solid black', marginBlock: '1rem 2rem', padding: '1rem', borderRadius: '10px',
                    width: { xs: '80vw', md: '30rem' },
                    backgroundColor: 'white'

                }}>
                    <h1 style={{ fontWeight: 300 }}>Write A Review</h1>
                    <Rating
                        sx={{
                            marginBlock: '0.5rem 0.7rem'
                        }}
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{
                        display: "block", width: '100%', borderRadius: '5px', padding: '0.5rem', fontSize: '1.1rem',
                    }} rows={4} placeholder="Write Your Review" />
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <button onClick={handleReview} style={{
                            marginTop: '1rem',
                            fontSize: '1.2rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: "#0267fd",
                            color: 'white',
                            borderRadius: '10px',
                            border: "none",
                            cursor: 'pointer'
                        }}>Send</button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
