import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { FunctionalityButton } from './FunctionalityButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../util/axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../util/UserContext';

export const Reserve = ({ handleClose, listing }) => {
    let navigate = useNavigate()
    let [fromDate, setFromDate] = useState("")
    let [price, setPrice] = useState({ nights: 0, totalPrice: 0 })
    let [toDate, setToDate] = useState("")
    let { user, setUser } = useUser()
    let InputField = styled('input')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid #ccc',
        borderRadius: "5px",
        width: '15rem',
        marginBottom: '2rem',
        marginRight: '4rem'
    }))
    let Label = styled('p')({
        fontSize: '1.3rem',
        marginBlock: '0.5rem',
        marginInline: '3rem 0.5rem',
        width: '6rem'
    })
    let InputWrapper = styled('div')({
        display: 'flex'
    })
    let BillWrapper = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        marginBlock: '0.6rem'
    })

    useEffect(() => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            if (end > start) {
                let nights = (end - start) / (1000 * 60 * 60 * 24)
                let totalPrice = (listing.rent * nights) + 209.93 + 209.93
                setPrice({ nights: nights, totalPrice: totalPrice })
            }
            else {
                setToDate('')
                setPrice({ nights: 0, totalPrice: 0 })
            }
        }
    }, [fromDate, toDate])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            user: user?.id,
            listing: listing._id,
            fromDate: fromDate,
            toDate: toDate,
            totalPrice: price.totalPrice,
            host: listing.user,
            status: 'Booked'
        }
        api.post('/booking', data).then(({ data }) => {
            navigate(`/booking/${data._id}`)
        })
    }
    const getNextDay = (date) => {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'start',
            marginBlock: '2rem',
            marginInline: '0.8rem',
        }}>
            <CloseIcon onClick={handleClose} sx={{
                background: 'red',
                borderRadius: '50%',
                width: "35px",
                height: "35px",
                padding: '4px',
                cursor: 'pointer',
            }} />
            <Box sx={{

                display: "flex",
                gap: 4,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: "center",
                height: '100vh',
            }}>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '10px'
                }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            fontSize: '1.6rem',
                            borderBottom: '2px solid #ccc',
                            textAlign: 'center',
                            marginBlock: '1rem',
                            paddingBottom: '0.4rem'
                        }}>Confirm & Book</Box>
                        <Box sx={{
                            fontSize: '1.2rem',
                            fontWeight: "600",
                            marginBottom: '0.4rem'
                        }}>Your Trip -</Box>
                        <InputWrapper>
                            <Label>CheckIn</Label>
                            <InputField required value={fromDate} onChange={(e) => setFromDate(e.target.value)} type='date' min={new Date().toISOString().split("T")[0]} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>CheckOut</Label>
                            <InputField required value={toDate} onChange={(e) => setToDate(e.target.value)
                            } type='date' min={fromDate && getNextDay(fromDate)} />
                        </InputWrapper>
                        <Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <FunctionalityButton title={"Book Now"} />
                        </Box>
                    </form>
                </Box>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: '2rem 1.5rem',
                    borderRadius: '10px'
                }}>
                    <Box sx={{
                        display: 'flex', border: '2px solid #cccc',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        gap: 2,
                        width: '22rem'
                    }}>
                        <Box ><img style={{
                            borderRadius: '4px'
                        }} src={listing.image[0].url} height={"90px"} width={"90px"} alt="err" /></Box>
                        <Box>
                            <Box sx={{ textWrap: 'wrap' }}>{listing.title}</Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        marginTop: '0.8rem',
                        border: '2px solid #cccc',
                        padding: '0.5rem 0.8rem',
                        borderRadius: '8px',
                        width: '22rem'
                    }}>
                        <h2>Booking Price -</h2>
                        <BillWrapper>
                            <h4>₹{listing.rent} X {price.nights} nights</h4>
                            <p>{listing.rent * price.nights}</p>
                        </BillWrapper>
                        <BillWrapper>
                            <h4>Tax</h4>
                            <p>209.93</p>
                        </BillWrapper>
                        <BillWrapper>
                            <h4>Airbnb Charge</h4>
                            <p>209.93</p>
                        </BillWrapper>
                        <Box sx={{
                            borderTop: '2px solid #ccc'
                        }}>
                            <BillWrapper>
                                <h4>Total Price</h4>
                                <p>{price.totalPrice}</p>
                            </BillWrapper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
