import "./Layout.css";
import {BrowserRouter} from "react-router-dom";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";

/**
 * Layout component serves as the main layout structure of the application.
 * It includes the navigation bar, main content area, footer, and toast container.
 */
function Layout(): JSX.Element{
    
    
    return (
        <div className="Layout">
            <BrowserRouter>
                    <Navbar/>
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
