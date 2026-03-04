import Box from "@mui/material/Box"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../util/axios"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import Typography from '@mui/material/Typography';
import { Pagination } from 'swiper/modules';
import CardContent from '@mui/material/CardContent';
import { BackButton } from "../components/BackButton";
import { toast } from 'react-toastify';


export const MyListing = () => {
    let navigate = useNavigate()
    let [allListing, setAllListing] = useState([])
    let [hasMore, setHasMore] = useState(true)
    let loadingRef = useRef(false)
    
    const fetchListings = async () => {
        if (loadingRef.current || !hasMore) return
        loadingRef.current = true
        let lastId = null;
        if (allListing.length > 0) {
            lastId = allListing[allListing.length - 1]._id;
        }
        api.get(`/listing/mylisting`, { params: { lastId } }).then(({ data }) => {
            setAllListing(prev => [...prev, ...data.allListing]);
            setHasMore(data.hasMore);
        })
            .catch((response) => { toast.error(response.data) })
            .finally(() => {
                loadingRef.current = false;
            })
    }
    useEffect(() => {
        fetchListings()
    }, [])
    
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.scrollHeight - 5
            ) {
                fetchListings();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allListing, hasMore]);

    const goToListing = (listingId) => {
        navigate(`/listing/${listingId}`)
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                paddingInline: '1rem'
            }}>
                <BackButton />
                <Box sx={{
                    fontSize: '2rem',
                    textAlign: 'center',
                    border: '2px solid Black',
                    padding: '1rem',
                    marginBlock: '2rem',
                    width: '20rem',
                    marginInline: 'auto'
                }}>
                    My Listing
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: 'wrap',
                gap: '1rem',
                marginLeft: '1.5rem'
            }}>
                {allListing.map((listing) =>
                    <Card key={listing._id} sx={{ maxWidth: 345 }}>

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
            </Box>

        </>
    )
}
