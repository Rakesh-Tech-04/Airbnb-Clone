import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useEffect } from 'react';
import { api } from '../util/axios';
import { useNavigate } from 'react-router-dom';
import { EditListing } from './EditListing';
import { Reserve } from './Reserve';
import { useUser } from '../util/UserContext';

export const ListingAction = ({ listing, setListing }) => {
    let navigate = useNavigate()
    let [isUser, setIsUser] = React.useState({})
    let { user, setUser } = useUser()
    useEffect(() => {
        api.get('/user/authStatus').then(({ data }) => {
            setIsUser(data)
        })
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        user ? setOpen(true) : navigate('/user/authentication')
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
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    listing.user === user?.id ?
                        <EditListing listing={listing} setListing={setListing} handleClose={handleClose} />
                        :
                        <Reserve handleClose={handleClose} listing={listing} />
                }
            </Modal>
        </div>
    )
}
