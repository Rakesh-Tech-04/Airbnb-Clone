import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
    let navigate = useNavigate()
    return (
        <button style={{ background: 'transparent', border: 'none' }} onClick={() => {
            if (window.history.length > 1) {
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
