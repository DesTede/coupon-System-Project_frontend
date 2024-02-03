import "./Layout.css";
import {BrowserRouter} from "react-router-dom";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";


function Layout(): JSX.Element{
    
    
    return (
        <div className="Layout">
            <BrowserRouter>
                {/*<header>*/}
                {/*    <Header />*/}
                {/*</header>*/}
                {/*<nav>*/}
                    <Navbar/>
                {/*</nav>*/}
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
