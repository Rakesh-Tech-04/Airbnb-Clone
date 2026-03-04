import { useEffect, useRef, useState } from "react"
import { api } from "../util/axios"
import { toast } from "react-toastify"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useNavigate } from 'react-router-dom'

export const MyBooking = () => {
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
        api.get(`/listing/booking/myBooking`, { params: { lastId } })
            .then(({ data }) => {
                console.log(data.allBooking)
                setAllBooking(prev => [...prev, ...data.allBooking])
                setHasMore(hasMore)
            })
            .catch(({ response }) => {
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
            paddingTop: '1rem'
        }}>
            {allBooking?.map((booking) =>
                <Box key={booking._id} style={{
                    backgroundColor: 'white',
                    marginBlock: '1rem',
                    display: 'flex',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'black'
                }}>
                    <img src={booking.listing.image[0].url} height={110} onClick={()=>{navigate(`/listing/${booking.listing._id}`)}}/>
                    <Container onClick={()=>{navigate(`/booking/${booking._id}`)}} sx={{
                        display: 'grid',
                        alignItems: 'center'
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
