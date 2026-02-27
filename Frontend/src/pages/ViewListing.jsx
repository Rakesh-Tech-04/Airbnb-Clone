import Box from "@mui/material/Box"
import { BackButton } from "../components/BackButton"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../util/axios"
import CardMedia from '@mui/material/CardMedia';
import { ListingAction } from "../components/ListingAction"

export const ViewListing = () => {
  let { listingId } = useParams()
  let [listing, setListing] = useState({})
  useEffect(() => {
    api.get(`/listing/${listingId}`).then(({ data }) => {
      setListing(data)
    })
  }, [])

  return (
    <>
      <Box sx={{ margin: '1rem 1rem 0rem 1rem' }}>
        <BackButton authSection={false} />
      </Box>
      <Box sx={{ display: 'grid', placeContent: 'center', padding: '1rem 1rem' }}>
        <Box sx={{ fontSize: '2rem' }}>{listing.city},{listing.landmark}</Box>
        <Box sx={{
          marginBlock: '1rem', display: 'grid',
          gap: 1, gridTemplateColumns: { xs: 'repeat(2,40vw)', md: 'repeat(5,15vw)' }, gridTemplateRows: { xs: 'repeat(2,20vh)',sm: 'repeat(2,30vh)', md: 'repeat(2,25vh)' }
        }}>
          {listing.image ? <>
            <CardMedia
              sx={{ gridColumn: { xs: '1/3', md: '1/4' }, gridRow: { xs: '1/2', md: '1/3' } }}
              image={listing.image[0]?.url}
              title="green iguana"
            />
            <CardMedia
              sx={{ gridColumn: { xs: '1/2', md: '4/6' } }}
              image={listing.image[1]?.url}
              title="green iguana"
            />
            <CardMedia
              sx={{ gridColumn: { xs: '2/3', md: '4/6' } }}
              image={listing.image[2]?.url}
            /> </> : ""
          }
        </Box>
        <Box sx={{ fontSize: '1.7rem', marginBottom: '0.7rem' }}>{listing.title}</Box>
        <Box sx={{ fontSize: '1.7rem' }}>{listing.description}</Box>
        <Box sx={{ fontSize: '1.7rem', marginTop: '0.7rem' }}>Rs.{listing.rent}/day
        </Box>
        <ListingAction listing={listing} setListing={setListing} />
      </Box>
    </>
  )
}
