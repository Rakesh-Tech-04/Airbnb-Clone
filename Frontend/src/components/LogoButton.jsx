import Box from "@mui/material/Box"

export const LogoButton = ({title}) => {
  return (
    <Box sx={{
        color:'white',
        backgroundColor:'red',
        fontSize:'1.2rem',
        padding:'0.7rem 1rem',
        borderRadius:'25px',
        textWrap:'nowrap'
        
    }}>
        {title}
    </Box>
  )
}
