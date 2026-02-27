import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { api } from "../util/axios"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom'
import CottageIcon from '@mui/icons-material/Cottage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import CabinIcon from '@mui/icons-material/Cabin';
import PoolIcon from '@mui/icons-material/Pool';
import BedIcon from '@mui/icons-material/Bed';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StoreIcon from '@mui/icons-material/Store';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useUser } from "../util/UserContext";

export const Listing = () => {
    let navigation = useNavigate()
    let { user, setUser } = useUser()
    let [allListing, setAllListing] = useState([])
    let [showCancelBooking, setShowCancelBooking] = useState(false)
    let [index, setIndex] = useState(null)
    useEffect(() => {
        api.get("/listing").then(({ data }) => {
            setAllListing(data)
        }).catch((err) => { console.log(err) })
    }, [])
    let [icons, setIcons] = useState([
        { name: 'Trending', active: true, iconName: WhatshotIcon },
        { name: 'Villa', active: false, iconName: VillaIcon },
        { name: 'Farm House', active: false, iconName: CottageIcon },
        { name: 'Pool House', active: false, iconName: PoolIcon },
        { name: 'Rooms', active: false, iconName: BedroomParentIcon },
        { name: 'Flat', active: false, iconName: ApartmentIcon },
        { name: 'PG', active: false, iconName: BedIcon },
        { name: 'Cabin', active: false, iconName: CabinIcon },
        { name: 'Shop', active: false, iconName: StoreIcon }
    ])

    const goToListing = (listingId) => {
        navigation(`/listing/${listingId}`)
    }
    const iconStyle = {
        fontSize: '2rem',
    }

    const handleSearchIcon = async (e) => {
        const p = e.currentTarget.querySelector("p").textContent
        api.get(`/listing/searchListing?search=${p}`).then(({ data }) => {
            setAllListing(data)
            setIcons(prev => prev.map(obj => (
                obj.name === p ? { ...obj, active: true } : { ...obj, active: false }
            ))).catch((err) => { console.log(err) })
        })
    }
    const handleBookingCancel = (i) => {
        setShowCancelBooking(prev => !prev)
        setIndex(prev => prev ? null : i)
    }
    const handleBookingCancelYes = (listingId) => {
        api.get(`/booking/cancelBooking/${listingId}`).then(({ data }) => {
            console.log(data)
        }).catch((err) => { console.log(err) })
        handleBookingCancel()
    }
    return (
        <>
            <Navbar />
            <Box sx={{
                display: "flex",
                justifyContent: { sm: 'center' },
                gap: 3,
                marginBlock: '1.5rem',
                marginInline: '1rem',
                textAlign: 'center',
                overflow: "auto",
            }}>
                {icons.map((icon, i) =>
                    <Box key={i} sx={{
                        cursor: "pointer",
                        borderBottom: `4px solid ${icon.active ? "#ddddddcc" : "white"}`,
                        transition: 'border-bottom 0.3s ease-in',

                        "&:hover": {
                            borderBottom: '4px solid #ddddddcc',
                            transition: 'border-bottom 0.3s ease-in'
                        }
                    }} onClick={handleSearchIcon}>
                        <icon.iconName sx={iconStyle} />
                        <p>{icon.name}</p>
                    </Box>
                )}
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: 'wrap',
                gap: '1rem',
                marginLeft: '1.5rem'
            }}>
                {allListing.map((listing, i) =>
                    <Card key={listing._id} sx={{ maxWidth: 345, position: 'relative' }}>
                        {listing.bookingStatus ?
                            <Box sx={{ position: 'absolute', zIndex: 100, right: 10, top: 10, backgroundColor: "white", padding: '0.4rem 0.4rem', borderRadius: '4px', color: 'green', display: 'flex', alignItems: 'center', gap: '1px' }}><CheckCircleOutlineIcon sx={{ fontSize: '1.2rem' }} /> Booked </Box> : null}
                        {listing.bookingStatus && listing.user === user?.id ? <>
                            <Box sx={{ position: 'absolute', zIndex: 100, right: 10, top: 50, backgroundColor: "white", padding: '0.4rem 0.4rem', borderRadius: '4px', color: "red", display: 'flex', alignItems: 'center', gap: '1px', cursor: "pointer" }} onClick={() => handleBookingCancel(i)}><BlockIcon sx={{ fontSize: '1.2rem' }} />Cancel Booking</Box>

                            {i === index && showCancelBooking ? <Box sx={{ backgroundColor: '#fffafaea', width: '90%', height: '33%', position: 'absolute', zIndex: 100, top: '25%', left: '5%', borderRadius: '10px', textAlign: 'center', paddingBlock: '1rem' }}>
                                <Box sx={{
                                    fontSize: "1.3rem"
                                }}>
                                    Booking Cancel!
                                </Box>
                                <Box sx={{ color: 'red', fontSize: "1.2rem" }}>
                                    Are You Sure?
                                    <button style={{ color: 'white', backgroundColor: 'red', border: 'none', outline: 'none', fontSize: "1.1rem", margin: '0.3rem', padding: '0.2rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleBookingCancelYes(listing._id)}>Yes</button>
                                    <button style={{ color: 'white', backgroundColor: 'red', border: 'none', outline: 'none', fontSize: "1.1rem", margin: '0.2rem', padding: '0.2rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} onClick={handleBookingCancel}>
                                        No</button>
                                </Box>
                            </Box> : ""} </> : null}

                        <Swiper
                            modules={Pagination}
                            pagination={{ clickable: true }}
                        >
                            <SwiperSlide>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={listing.image[0].url}
                                    title="green iguana"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={listing.image[1].url}
                                    title="green iguana"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={listing.image[2].url}
                                    title="green iguana"
                                />
                            </SwiperSlide>
                        </Swiper>
                        <CardContent onClick={() => goToListing(listing._id)} sx={{ cursor: 'pointer' }}>
                            <Typography sx={{
                                textWrap: 'nowrap',
                                overflow: 'hidden', textOverflow: 'ellipsis',
                            }} gutterBottom variant="h5" component="div">
                                {listing.title}
                            </Typography>
                            <Typography variant="h5" sx={{ fontSize: '1rem', textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {listing.description}
                            </Typography>
                            <Typography sx={{ color: 'brown' }}>
                                ₹{listing.rent}/day
                            </Typography>
                        </CardContent>

                    </Card>
                )}
            </Box >
        </>
    )
}
