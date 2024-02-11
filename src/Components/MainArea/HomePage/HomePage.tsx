import "./HomePage.css";
import React from "react";
import { Box, Typography } from "@mui/material";
import {authStore} from "../../../Redux/OurStore";



function AboutUs(): JSX.Element {
    
    const user = authStore.getState().user;
    
    return (
        <Box className="root">
            <Box className="content">
                <Typography variant="h4" gutterBottom>
                    Hello {user.name}
                </Typography>
                <Typography variant="body1" paragraph >
                    {user.clientType === "Administrator" && (
                        <>
                            <h4>
                            As an administrator, you wield full control. Manage companies and customers
                            effortlessly by adding, editing, and deleting their profiles. Your role ensures 
                            the smooth functioning of the system
                            </h4>
                        </>
                    )}
                    {user.clientType === "Company" && (
                        <>
                            <h4>
                            You, as a company, are pivotal. Create, update, and remove coupons to entice customers.
                            Your efforts drive brand visibility and attract potential buyers through enticing promotions
                            </h4>
                        </>
                    )}
                    {user.clientType === "Customer" && (
                        <>
                            <h4>
                            You, the customer, hold the purchasing power. 
                            Browse and purchase coupons from various companies. 
                            Add coupons to your account for future use, shaping the interaction between companies and end-consumers.
                            </h4>
                        </>
                    )}
                    
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat*/}
                    {/*fringilla nisl vel lacinia. Pellentesque habitant morbi tristique*/}
                    {/*senectus et netus et malesuada fames ac turpis egestas. Integer id*/}
                    {/*velit tellus.*/}
                </Typography>
            </Box>
        </Box>
    );
}

export default AboutUs;





// import "./HomePage.css";
// import {CardContent} from "@mui/material";
// import {authStore} from "../../../Redux/OurStore";
//
// function HomePage(): JSX.Element{
//    
//     const user = authStore.getState().user;
//    
//    
//    
//    
//    
//    
//     return (
//         <div className="HomePage">
//             <CardContent>
//                 {user.clientType === "Administrator" &&(
//                     <CardContent className={"homeCard"}>
//                         <h1>
//                             Hello Administrator!
//                         </h1>
//                         <h3>
//                             Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
//                             <br/>
//                             you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.
//                         </h3>
//                     </CardContent>
//                 )}
//                
//                 {user.clientType === "Company" && (
//                     <>
//                         <h1>
//                             Hello {user.name}!
//                             <br/>
//                             Welcome to The Coupon Emporium
//                         </h1>
//
//                         <h3>
//                             Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
//                             <br/>
//                             Our platform offers powerful tools to streamline coupon management and enhance customer engagement.
//                             Easily create, edit, and track companies and customers tailored to your business needs.
//                             Gain valuable insights through detailed reports and analytics.
//
//                             Maximize your marketing efforts with our advanced coupon management system.
//                             Our user-friendly interface simplifies navigation and system configuration.
//
//                             Whether you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.
//
//                         </h3>
//                     </>
//                 )}
//                 {user.clientType === "Customer" && (
//                     <>
//                         <h1>
//                             Hello {user.name}!
//                             <br/>
//                             Welcome to The Coupon Emporium
//                         </h1>
//
//                         <h3>
//                             Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
//                             <br/>
//                             Our platform offers powerful tools to streamline coupon management and enhance customer engagement.
//                             Easily create, edit, and track companies and customers tailored to your business needs.
//                             Gain valuable insights through detailed reports and analytics.
//
//                             Maximize your marketing efforts with our advanced coupon management system.
//                             Our user-friendly interface simplifies navigation and system configuration.
//
//                             Whether you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.
//                         </h3>
//                     </>
//                 )}
//             </CardContent>
//            
//         </div>
//     );
// }
//
// export default HomePage;
