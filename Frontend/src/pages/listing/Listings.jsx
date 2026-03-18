import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { api } from "../../util/axios"
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
import { toast } from "react-toastify";
import { useRef } from "react";

export const Listings = () => {
    let navigation = useNavigate()
    let [allListing, setAllListing] = useState([])
    // const [loading, setLoading] = useState(false);
    const [searchDescribe, setSearchDescribe] = useState(null)
    const loadingRef = useRef(false);

    const fetchListings = async (e) => {
        if (loadingRef.current) return;
        loadingRef.current = true
        let lastId = null;
        let p = searchDescribe
        if (allListing.length > 0) {
            lastId = allListing[allListing.length - 1]._id;
        }
        if (e) {
            p = e.currentTarget.querySelector("p").textContent
            setAllListing([])
            setSearchDescribe(p)
            lastId = null
            setIcons(prev => prev.map(obj => (
                obj.name === p ? { ...obj, active: true } : { ...obj, active: false }
            )))
        }

        api.get("/listings", { params: { lastId, p } })
            .then(({ data }) => {
                setAllListing(prev => [...prev, ...data.allListing]);
            })
            .catch((response) => { toast.error(response.data) })
            .finally(() => {
                loadingRef.current = false;
            })
    };

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
    }, [allListing]);


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
    const handleSearch = (e)=>{
        api.get(`/listings/searchListing?search=${e}`).then(({data})=>{
            setAllListing(data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <>
            <Navbar onSearch={handleSearch}/>
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
                    }} onClick={fetchListings}>
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
                {allListing.map((listing) =>
                    <Card key={listing._id} sx={{ maxWidth: 345, position: 'relative' }}>

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
