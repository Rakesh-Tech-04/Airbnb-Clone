import Button from '@mui/material/Button';
import Dialog from '@mui/material/Modal';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditListingModal } from './EditListingModal';
import { ReserveModal } from './ReserveModal';
import { useUser } from '../util/UserContext';

export const ListingActionModal = ({ listing, setListing }) => {
    let navigate = useNavigate()
    let { user } = useUser()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        user ? setOpen(true) : navigate('/authentication')
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button sx={{
                fontSize: '1.2rem',
                color: "white",
                background: 'red',
                border: 'none',
                padding: '0.7rem 5rem',
                marginBlock: '0.7rem',
                borderRadius: '8px',
                cursor: 'pointer'
            }} onClick={handleOpen}>{listing.user === user?.id ? "Edit Listing" : "Reserve"}</Button>
            <Dialog
                open={open}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
            >
                {
                    listing.user === user?.id ?
                        <EditListingModal listing={listing} setListing={setListing} handleClose={handleClose} />
                        :
                        <ReserveModal handleClose={handleClose} listing={listing} />
                }
            </Dialog>
        </div>
    )
}
