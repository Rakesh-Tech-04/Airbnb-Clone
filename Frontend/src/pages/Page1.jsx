import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { BackButton } from "../components/BackButton"
import { FunctionalityButton } from "../components/FunctionalityButton"
import { LogoButton } from "../components/LogoButton"
import { useFormContext } from 'react-hook-form'
import { useNavigate } from "react-router-dom"

export const Page1 = () => {
    let navigate = useNavigate()
    let { register, handleSubmit, formState: { isSubmitting } } = useFormContext()
    let InputField = styled('input')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid black',
        borderRadius: "5px",
        width: '50vw',
        marginBottom: '0.3rem',
        [theme.breakpoints.down('md')]: {
            width: '65vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '85vw'
        }
    }))
    let TextArea = styled('textarea')(({ theme }) => ({
        fontSize: '1.3rem',
        padding: '0.3rem 0.5rem',
        border: '2px solid black',
        borderRadius: "5px",
        width: '50vw',
        marginBottom: '0.3rem',
        [theme.breakpoints.down('md')]: {
            width: '65vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '85vw'
        }
    }))
    let Label = styled('p')({
        fontSize: '1.3rem',
        marginBlock: '0.5rem'
    })
    const onSubmit = async () => {
        navigate('/listing/addListing/page2')
    }
    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                margin: '1rem'
            }}>
                <BackButton />
                <LogoButton title={"SetUp Your Home"} />
            </Box>
            <form style={{
                display: 'grid',
                placeContent: 'center',
                margin: '2rem 0.8rem'
            }} onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box>
                        <Label>Title</Label>
                        <InputField {...register("title")} placeholder="Title" required />
                    </Box>
                    <Box>
                        <Label>Description</Label>
                        <TextArea {...register("description")} placeholder="Description" rows={3} />
                    </Box>
                    <Box>
                        <Label>Image1</Label>
                        <InputField required {...register('image.0')} type="file" />
                    </Box>
                    <Box>
                        <Label>Image2</Label>
                        <InputField required {...register('image.1')} type="file" />
                    </Box>
                    <Box>
                        <Label>Image3</Label>
                        <InputField required {...register('image.2')} type="file" />
                    </Box>
                    <Box>
                        <Label>Rent</Label>
                        <InputField required type="number" min={1000} {...register("rent", { valueAsNumber: true })} placeholder="Rent._/day" />
                    </Box>
                    <Box>
                        <Label>City</Label>
                        <InputField required {...register("city")} placeholder="City" />
                    </Box>
                    <Box>
                        <Label>Landmark</Label>
                        <InputField required {...register("landmark")} placeholder="Landmark" />
                    </Box>
                    <FunctionalityButton title={"Next"} isSubmitting={isSubmitting} loadingTitle={'loading...'} />
                </Box>

            </form>
        </Box>
    )
}
