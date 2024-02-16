import "./HomePage.css";
import React from "react";
import { Box, Typography } from "@mui/material";
import {authStore} from "../../../Redux/OurStore";


/**
 * Component representing the home page of the application.
 * Renders a personalized greeting message based on the user's role.
 */
function HomePage(): JSX.Element {

    /**
     * Get the user information from the Redux store
     */

    const user = authStore.getState().user;
    
    return (
        <Box className="root">
            <Box className="content">
                <Typography variant="h4" gutterBottom>
                    Hello {user.name}
                </Typography>
                {user.clientType === "Administrator" && (
                    <h4>
                        As an administrator, you wield full control. Manage companies and customers
                        effortlessly by adding, editing, and deleting their profiles. Your role ensures
                        the smooth functioning of the system
                    </h4>
                )}
                {user.clientType === "Company" && (
                    <h4>
                        You, as a company, are pivotal. Create, update, and remove coupons to entice customers.
                        Your efforts drive brand visibility and attract potential buyers through enticing promotions
                    </h4>
                )}
                {user.clientType === "Customer" && (
                    <h4>
                        You, the customer, hold the purchasing power.
                        Browse and purchase coupons from various companies.
                        Add coupons to your account for future use, shaping the interaction between companies and end-consumers.
                    </h4>
                )}
            </Box>
        </Box>
    );
}

export default HomePage;



