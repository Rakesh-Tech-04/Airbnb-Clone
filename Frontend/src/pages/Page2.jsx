import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CottageIcon from '@mui/icons-material/Cottage';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import CabinIcon from '@mui/icons-material/Cabin';
import PoolIcon from '@mui/icons-material/Pool';
import BedIcon from '@mui/icons-material/Bed';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import StoreIcon from '@mui/icons-material/Store';
import { BackButton } from '../components/BackButton'
import { LogoButton } from "../components/LogoButton"
import { FunctionalityButton } from '../components/FunctionalityButton'
import { useNavigate } from 'react-router-dom';

export const Page2 = () => {
    let navigate = useNavigate()
    let [describes, setDescribes] = useState([
        { name: 'Villa', border: true, icon: VillaIcon },
        { name: 'Farm House', border: true, icon: CottageIcon },
        { name: 'Pool House', border: true, icon: PoolIcon },
        { name: 'Rooms', border: true, icon: BedroomParentIcon },
        { name: 'Flat', border: true, icon: ApartmentIcon },
        { name: 'PG', border: true, icon: BedIcon },
        { name: 'Cabin', border: true, icon: CabinIcon },
        { name: 'Shop', border: true, icon: StoreIcon },
    ])
    let { getValues, setValue, formState: { isSubmitting } } = useFormContext()
    useEffect(() => {
        let value = getValues().describe || []
        setDescribes(prev => prev.map(describe => ({
            ...describe,
            border: !value.includes(describe.name)
        })))
        
    }, [])
    const iconStyle = {
        fontSize: '2rem',
    }
    const selectDescribe = (e) => {
        const p = e.currentTarget.querySelector("p").textContent
        setDescribes(prev => prev.map(describe => describe.name === p
            ? {
                ...describe,
                border: !describe.border
            }
            : describe))
    }
    const handleClick = () => {
        let describe = describes.reduce((arr, item) => {
            if (!item.border) arr.push(item.name)
            return arr
        }, [])
        setValue("describe", describe)
        navigate('/listing/addListing/page3')
    }
    return (
        <Box>
            <Box sx={{
                marginBlock: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                padding: '1rem',
                gap: 3
            }}>
                <BackButton />
                <Box sx={{
                    width: '30rem',
                    marginTop: '5rem'
                }}>
                    <Box sx={{ fontSize: '1.5rem', marginBottom: '3rem' }}>Which of these best describes your place?</Box>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3
                    }}>
                        {describes.map((describe, i) => <Box key={i} onClick={selectDescribe} sx={{
                            border: describe.border ? '2px solid #ccc' : '2px solid #a2a2a2',
                            width: '9rem',
                            py: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            '&:hover': {
                                border: '2px solid #a2a2a2 ',
                            }
                        }}>

                            <describe.icon sx={iconStyle} />
                            <p>{describe.name}</p>
                        </Box>)}
                    </Box>
                </Box>
                <LogoButton title={"Set Your Category"} />
            </Box>
            <Box sx={{
                position: 'fixed',
                right: {xs:10,sm:20,md:40},
                bottom: {xs:10,md:10},
            }}>
                <FunctionalityButton title={"Next"} onClick={handleClick} />
            </Box>
        </Box>
    )
}
