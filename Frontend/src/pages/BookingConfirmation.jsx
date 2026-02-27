import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { FunctionalityButton } from '../components/FunctionalityButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../util/axios'

export const BookingConfirmation = () => {
    let navigate = useNavigate()
    let params = useParams()
    let [bookingDetail, setBookingDetail] = useState({})

    let BookingDetail = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        marginBlock: '1.5rem'
    })
    useEffect(() => {
        api.get(`/booking/${params.bookingId}`).then(({ data }) => {
            setBookingDetail(data)
        })
    }, [])
    // useEffect(() => {
    //     console.log(bookingDetail)
    // }, [bookingDetail])
    const handleClick = () => {
        navigate('/listing')
    }
    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#cfcfcfcc',
            display: 'flex',
        }}>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{ backgroundColor: 'white', textAlign: 'center', width: '30rem', padding: '3rem 1rem', borderRadius: '5px' }}>
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
            <Box sx={{ position: 'absolute', top: 20, right: 40 }}>
                <FunctionalityButton title={'Back to Home'} onClick={handleClick} />
            </Box>
        </Box>
    )
}
