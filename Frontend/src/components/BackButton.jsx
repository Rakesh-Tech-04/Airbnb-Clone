import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

export const BackButton = (authSection = false) => {
    let navigate = useNavigate()
    return (
        <button style={{ background: 'transparent', border: 'none' }} onClick={() => {
            if (authSection) {
                navigate('/listings')
            }
            else if (window.history.length > 1) {
                navigate(-1);
            }
            else {
                navigate("/listings"); 
            }
        }}>
            <ArrowCircleLeftIcon sx={{
                color: 'red',
                fontSize: '3.5rem',
                cursor: 'pointer'
            }} />
        </button>
    )
}
