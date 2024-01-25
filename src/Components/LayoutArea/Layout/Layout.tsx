import "./Layout.css";
import {BrowserRouter, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import {authStore} from "../../../Redux/OurStore";
import PublicNavbar from "../../NavbarArea/PublicNavbar/PublicNavbar";
import AdminNavbar from "../../NavbarArea/AdminNavbar/AdminNavbar";
import CompanyNavbar from "../../NavbarArea/CompanyNavbar/CompanyNavbar";
import CustomerNavbar from "../../NavbarArea/CustomerNavbar/CustomerNavbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout(): JSX.Element{
    
    // const navigate = useNavigate();
    const [nav, setNav] = useState<any>(); // need to update this type

    useEffect(() => {
        switch (authStore.getState().user?.clientType) {
            case "Administrator":
                setNav(<AdminNavbar/>);
                break;
            case "Company":
                setNav(<CompanyNavbar/>);
                break;
            case "Customer":
                setNav(<CustomerNavbar/>);
                break;
            default:
                setNav(<PublicNavbar/>);
                break;
        }
        const unsubscribe = authStore.subscribe(() => {
            switch (authStore.getState().user?.clientType) {
                case "Administrator":
                    setNav(<AdminNavbar/>);
                    break;
                case "Company":
                    setNav(<CompanyNavbar/>);
                    break;
                case "Customer":
                    setNav(<CustomerNavbar/>);
                    break;
                default:
                    setNav(<PublicNavbar/>);
                    break;
            }});
            
        return ()=> {
            unsubscribe();
        }
        
    }, []);
    
    return (
        <div className="Layout">
            <BrowserRouter>
                <header>
                    <Header />
                </header>
                <nav>
                    {/* here I need to add the appropriate navbar for each user type.*/}
                    {nav}
                </nav>
                <main>
                    <Routing/>
                </main>
                <footer>
                    <Footer/>
                </footer>
                <ToastContainer/>
            </BrowserRouter>
			
        </div>
    );
}

export default Layout;
