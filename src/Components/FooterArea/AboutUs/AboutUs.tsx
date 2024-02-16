import "./AboutUs.css";
import React from "react";
import { Box, Typography } from "@mui/material";


function AboutUs(): JSX.Element {
    return (
        <Box className="root">
            <Box className="content">
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="h5" paragraph>
                    
                    Welcome to the Coupon Emporium!
                    
                    
                </Typography>
                <Typography variant="h6" paragraph>
                    We are dedicated to revolutionizing the way you discover and redeem deals.
                    Our platform serves as a hub for companies to showcase their promotions and for customers to browse and purchase coupons.
                    Whether you're a savvy shopper looking to save on your favorite products or a business seeking to attract new customers, our system caters to your needs.
                    Join our community today and embark on a journey of savings and convenience.
                </Typography>
            </Box>
        </Box>
    );
}

export default AboutUs;
