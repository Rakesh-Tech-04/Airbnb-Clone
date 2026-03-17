import { useEffect, useRef, useState } from "react"
import { api } from "../../util/axios"
import { toast } from "react-toastify"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'

export const MyBookings = () => {
    let navigate = useNavigate()
    let [allBooking, setAllBooking] = useState([])
    let [hasMore, setHasMore] = useState(true)
    let loadingRef = useRef(false)

    const fetchBooking = () => {
        if (loadingRef.current || !hasMore) return
        loadingRef.current = true
        let lastId = null
        if (allBooking.length > 0) {
            lastId = allBooking[allBooking.length - 1]._id
        }
        api.get(`/bookings/my`, { params: { lastId } })
            .then(({ data }) => {
                setAllBooking(prev => [...prev, ...data.allBooking])
                setHasMore(hasMore)
            })
            .catch(({ response }) => {
                if (response.status === 401) {
                    navigate('/authentication')
                }
                toast.error(response.data.message)
            })
            .finally(() => {
                loadingRef.current = false
            })

    }
    useEffect(() => {
        fetchBooking()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.scrollHeight - 1
            ) {
                fetchBooking();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allBooking, hasMore])
    return (

        <Box sx={{
            backgroundColor: "#ccc",
            minHeight: '100vh',
            paddingTop: '1rem',
            paddingInline: '1rem',

        }}>
            <BackButton />
            {allBooking?.map((booking) =>
                <Box key={booking._id} style={{
                    backgroundColor: 'white',
                    marginBlock: '1rem',
                    display: 'flex',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'black',
                    borderRadius: "10px",
                    overflow: 'hidden'
                }}>
                    <img src={booking.listing.image[0].url} height={150} onClick={() => { navigate(`/listing/${booking.listing._id}`) }} />
                    <Container onClick={() => { navigate(`/booking/${booking._id}`) }} sx={{
                        display: 'grid',
                        alignItems: 'center',
                        gap: 0.8,
                        paddingBlock: '0.2rem'
                    }}>
                        <Box>Title - {booking.listing.title}</Box>
                        <Box>
                            Booking Status - {booking.status}
                        </Box>
                        <Box>
                            Booking id - {booking._id}
                        </Box>
                        <Box>
                            Booking date -  {new Date(booking.fromDate).toLocaleDateString()} - {new Date(booking.toDate).toLocaleDateString()}
                        </Box>
                        <Box>
                            Total Price - {booking.totalPrice}
                        </Box>

                    </Container>
                </Box>
            )
            }
        </Box >

    )
}
