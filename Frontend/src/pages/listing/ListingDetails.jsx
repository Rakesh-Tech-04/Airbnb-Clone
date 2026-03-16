import Box from "@mui/material/Box"
import { BackButton } from "../../components/BackButton"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { api } from "../../util/axios"
import CardMedia from '@mui/material/CardMedia';
import Container from "@mui/material/Container"
import { toast } from "react-toastify"
import { useUser } from "../../util/UserContext"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Rating from '@mui/material/Rating';
import { ListingActionModal } from "../../components/ListingActionModal"


export const ListingDetails = () => {
  const { user } = useUser()
  let [reviews, setReviews] = useState([])
  let [showDelete, setShowDelete] = useState(null)
  let { listingId } = useParams()
  let [listing, setListing] = useState({})

  useEffect(() => {
    api.get(`/listings/${listingId}`).then(({ data }) => {
      setListing(data)
    })
    api.get(`/listings/${listingId}/reviews`)
      .then(({ data }) => {
        setReviews(data)
      }).catch(({ response }) => {
        toast.error(response.data.message)
      })
  }, [])
  const handleReviewDelete = (reviewId) => {
    api.delete(`/listings/${listingId}/reviews/${reviewId}`).then(({ data }) => {
      setReviews(prev => (
        prev.filter(item => item._id !== data._id)
      ))
      toast.success('Review deleted')
    }).catch(({ response }) => {
      toast.error(response.data.message)
    })
  }

  return (
    <>
      <Box sx={{ margin: '1rem 1rem 0rem 1rem' }}>
        <BackButton authSection={false} />
      </Box>
      <Box sx={{ display: 'grid', placeContent: 'center', padding: '1rem' }}>
        <Box sx={{ fontSize: '2rem' }}>{listing.city},{listing.landmark}</Box>
        <Box sx={{
          marginBlock: '1rem', display: 'grid',
          gap: 1, gridTemplateColumns: { xs: 'repeat(2,40vw)', md: 'repeat(5,15vw)' }, gridTemplateRows: { xs: 'repeat(2,20vh)', sm: 'repeat(2,30vh)', md: 'repeat(2,25vh)' }
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
        {user && <ListingActionModal listing={listing} setListing={setListing} />}
      </Box>
      <Box>
        {reviews && reviews.map((review) =>
          <Box key={review._id} sx={{ marginBottom: 3, position: 'relative' }}>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                <Box sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  width: "40px",
                  height: '40px',
                  fontSize: '1.4rem',
                  borderRadius: "50%",
                  display: 'grid',
                  placeContent: 'center',
                }}>{(review.user?.name).charAt(0).toUpperCase()} </Box>
                <Box sx={{ fontWeight: 600 }}>
                  {review.user?.name}
                </Box>
              </Box>

              {user.id === review.user._id && <><MoreHorizIcon onClick={() => setShowDelete(prev => prev === review._id ? null : review._id)} sx={{ cursor: 'pointer', }} />
                {showDelete === review._id && <Box onClick={() => handleReviewDelete(review._id)} sx={{ background: 'red', display: 'inline-block', color: 'white', padding: '0.3rem 0.5rem', borderRadius: '5px', position: 'absolute', top: 30, right: 5, cursor: 'pointer', '&:hover': { background: '#ff6100' } }}>
                  Delete
                </Box>
                }</>
              }

            </Container>
            <Container sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
              <Rating
                sx={{
                  marginBlock: '0.5rem',
                  fontSize: '1.2rem'
                }}
                name="read-only"
                value={review.rating}
                readOnly
              />
              <Box>{new Date(review.createdAt).toLocaleDateString('en-In')}</Box>
            </Container>
            <Container sx={{ fontSize: '1.1rem', }}>
              <Box sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{review.comment}</Box>

            </Container>
          </Box>
        )}
      </Box>

    </>
  )
}
