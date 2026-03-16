import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Authentication } from "../pages/user/Authentication";
import { MyBookings } from "../pages/booking/MyBookings";
import { BookingConfirmation } from "../pages/booking/BookingConfirmation";
import { Listings } from "../pages/listing/Listings";
import { ListingDetails } from "../pages/listing/ListingDetails";
import { MyListings } from "../pages/listing/MyListings";
import { AddListingLayout } from "../pages/listing/add/AddListingLayout";
import { AddBasicInfo } from "../pages/listing/add/AddBasicInfo";
import { AddDetails } from "../pages/listing/add/AddDetails";
import { AddConfirmation } from "../pages/listing/add/AddConfirmation";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        /* Listings */
        {
            path: "listings",
            element: <Listings />
        },
        {
            path: 'listing/add',
            element: <AddListingLayout />,
            children: [
                {
                    path: 'basic-info',
                    element: <AddBasicInfo />
                },
                {
                    path: 'details',
                    element: <AddDetails />
                },
                {
                    path: 'confirmation',
                    element: <AddConfirmation />
                }
            ]
        },
        {
            path: 'listing/:listingId',
            element: <ListingDetails />
        },

        {
            path: 'my-listings',
            element: <MyListings />
        },
        {
            path: "authentication",
            element: <Authentication />
        },

        {
            path: 'booking/:bookingId',
            element: <BookingConfirmation />
        },
        {
            path: 'my-bookings',
            element: <MyBookings />
        }

    ]
}])