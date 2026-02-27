import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Listing } from "../pages/Listing";
import { ViewListing } from "../pages/ViewListing";
import { Page1 } from "../pages/Page1";
import { Page2 } from "../pages/Page2";
import { AddListingLayout } from "../pages/AddListingLayout";
import { Page3 } from "../pages/Page3";
import { Authentication } from "../pages/Authentication";
import { BookingConfirmation } from "../pages/BookingConfirmation";
import { MyListing } from "../pages/MyListing";
import { useUser } from "./UserContext";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "listing",
            element: <Listing />
        },
        {
            path: 'listing/addListing',
            element: <AddListingLayout />,
            children: [
                {
                    path: 'page1',
                    element: <Page1 />
                },
                {
                    path: 'page2',
                    element: <Page2 />
                },
                {
                    path: 'page3',
                    element: <Page3 />
                }
            ]
        },
        {
            path: "/user/authentication",
            element: <Authentication />
        },
        {
            path: '/mylisting/:userId',
            element: <MyListing />
        },
        {
            path: 'listing/:listingId',
            element: <ViewListing />
        },
        {
            path: '/booking/:bookingId',
            element: <BookingConfirmation />
        }

    ]
}])