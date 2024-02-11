import "./IndexPAge.css";
import { Box, Typography } from "@mui/material";
import React from "react";


function IndexPAge(): JSX.Element {


    return (
        <Box className="root">
            <Box className="content">
                <Typography className={"Typo"} variant="h4" gutterBottom>
                    Hello!
                </Typography>
                <Typography className={"Typo"} variant="h6" paragraph>
                    Explore a world of savings and deals by joining our coupon management system. 
                    <br/>
                    With our platform, you gain access to exclusive discounts from a wide range of companies.
                    <br/>
                    Discover enticing offers tailored to your preferences and start saving money today. 
                    <br/>
                    Sign up now to unlock a treasure trove of savings and elevate your shopping experience to new heights.
                </Typography>
            </Box>
        </Box>
    );
}

export default IndexPAge;
//     return (
//         <div className="IndexPAge">
//             <Typography variant="body1" paragraph>
//                 Explore a world of savings and deals by joining our coupon management system. 
//                 With our platform, you gain access to exclusive discounts from a wide range of companies.
//                 Discover enticing offers tailored to your preferences and start saving money today. 
//                 Sign up now to unlock a treasure trove of savings and elevate your shopping experience to new heights.
//             </Typography>
//         </div>
//     );
// }
//
// export default IndexPAge;
