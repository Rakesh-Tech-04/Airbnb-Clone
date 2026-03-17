import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../util/axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { ActionButton } from './ActionButton';

export const ReserveModal = ({ handleClose, listing }) => {
    let navigate = useNavigate()
    let [fromDate, setFromDate] = useState(null)
    let [nights, setNights] = useState(0)
    let [toDate, setToDate] = useState("")
    let [existingBookingDates, setExistingBookingDates] = useState([])

    let Label = styled('p')({
        fontSize: '1.3rem',
        marginBlock: '0.5rem',
        marginInline: '3rem 0.5rem',
        width: '6rem'
    })
    let InputWrapper = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
    }))

    let BillWrapper = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        marginBlock: '0.6rem'
    })

    useEffect(() => {
        api.get(`/listings/${listing._id}/bookings`)
            .then(({ data }) => {
                setExistingBookingDates(data)
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            listing: listing._id,
            fromDate: fromDate,
            toDate: toDate,
        }
        api.post(`/bookings`, data)
            .then(({ data }) => {
                navigate(`/booking/${data._id}`)
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })
    }
    let maxToDate = null;

    if (fromDate && existingBookingDates.length > 0) {

        const futureBookings = existingBookingDates
            .filter(b => new Date(b.fromDate) > fromDate)
            .sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));

        if (futureBookings.length > 0) {
            maxToDate = new Date(futureBookings[0].fromDate);
            maxToDate.setDate(maxToDate.getDate() - 1);
        }
    }

    return (
        <>
            <CloseIcon onClick={handleClose} sx={{
                background: 'red',
                borderRadius: '50%',
                width: "35px",
                height: "35px",
                margin: '1rem',
                cursor: 'pointer',
            }} />
            <Box sx={{
                display: 'flex',
                alignItems: 'start',
                // marginBlock: '2rem',
                marginInline: '0.8rem',
            }}>
                <Box sx={{
                    display: { lg: "flex" },
                    gap: 4,
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: "center",
                    // height: '100vh',
                }}>
                    <Box sx={{
                        backgroundColor: 'white',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '10px',
                        marginBottom: { xs: '1rem', lg: 0 },
                        width: { xs: '95vw', lg: 'auto' },
                        // overflow:'hidden'

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

                                <DatePicker
                                    minDate={new Date()}
                                    selected={fromDate}
                                    onChange={(e) => {
                                        setFromDate(e)

                                    }}
                                    excludeDateIntervals={existingBookingDates?.map(date => ({ start: new Date(date.fromDate), end: new Date(date.toDate) }))}
                                />

                            </InputWrapper>
                            <InputWrapper>
                                <Label>CheckOut</Label>

                                <DatePicker
                                    minDate={fromDate || new Date()}
                                    maxDate={maxToDate}
                                    selected={toDate}
                                    onChange={(e) => {
                                        setToDate(e)
                                        let nights = (e - fromDate) / (24 * 60 * 60 * 1000)
                                        setNights(nights)
                                    }}
                                    disabled={!fromDate}
                                // excludeDates={blockedDates}
                                />

                            </InputWrapper>
                            <Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <ActionButton type='submit' title={"Book Now"} />
                            </Box>
                        </form>
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        backgroundColor: 'white',
                        padding: '2rem 1.5rem',
                        borderRadius: '10px',
                        width: { xs: '95vw', lg: 'auto' },
                        placeContent: { xs: 'center', lg: 'normal' }
                    }}>
                        <Box sx={{
                            display: 'flex',
                            border: '2px solid #cccc',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            gap: 2,
                            width: '22rem',

                        }}>
                            <Box ><img style={{
                                borderRadius: '4px'
                            }} src={listing.image[0]?.url} height={"90px"} width={"90px"} alt="err" /></Box>
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
                                <h4>₹{listing.rent} X {nights} nights</h4>
                                <p>{listing.rent * nights}</p>
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
                                    <p>{(listing.rent * nights) + (209 * 2)}</p>
                                </BillWrapper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}
