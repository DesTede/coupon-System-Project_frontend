import "./HomePage.css";
import {CardContent} from "@mui/material";
import {authStore} from "../../../Redux/OurStore";

function HomePage(): JSX.Element{
    
    const user = authStore.getState().user;
    
    return (
        <div className="HomePage">
            <CardContent>
                {user.clientType === "Administrator" &&(
                    <CardContent className={"homeCard"}>
                        <h1>
                            Hello Administrator!
                        </h1>
                        <h3>
                            Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
                            <br/>
                            you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.
                        </h3>
                    </CardContent>
                )}
                
                {user.clientType === "Company" && (
                    <>
                        <h1>
                            Hello {user.name}!
                            <br/>
                            Welcome to The Coupon Emporium
                        </h1>

                        <h3>
                            Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
                            <br/>
                            Our platform offers powerful tools to streamline coupon management and enhance customer engagement.
                            Easily create, edit, and track companies and customers tailored to your business needs.
                            Gain valuable insights through detailed reports and analytics.

                            Maximize your marketing efforts with our advanced coupon management system.
                            Our user-friendly interface simplifies navigation and system configuration.

                            Whether you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.

                        </h3>
                    </>
                )}
                {user.clientType === "Customer" && (
                    <>
                        <h1>
                            Hello {user.name}!
                            <br/>
                            Welcome to The Coupon Emporium
                        </h1>

                        <h3>
                            Welcome to The Coupon Emporium, your ultimate solution for coupon and promotion management.
                            <br/>
                            Our platform offers powerful tools to streamline coupon management and enhance customer engagement.
                            Easily create, edit, and track companies and customers tailored to your business needs.
                            Gain valuable insights through detailed reports and analytics.

                            Maximize your marketing efforts with our advanced coupon management system.
                            Our user-friendly interface simplifies navigation and system configuration.

                            Whether you're a seasoned marketer or new to coupon management, The Coupon Emporium provides the tools and support you need to succeed.
                        </h3>
                    </>
                )}
            </CardContent>
            
        </div>
    );
}

export default HomePage;
