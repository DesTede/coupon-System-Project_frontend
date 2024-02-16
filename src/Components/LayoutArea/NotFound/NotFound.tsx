import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";


/**
 * Component representing the 404 Not Found page.
 * Renders a message indicating that the requested page couldn't be found.
 * Provides a link to redirect users to the homepage.
 */
function NotFound(): JSX.Element {
    return (
        <section className="not-found">
            <div className="container">
                <div className="content">
                    <h2 className="error-code">404</h2>
                    <p className="error-message">Sorry, we couldn't find this page.</p>
                    <p className="info-message">But don't worry, you can find plenty of other things on our
                        homepage.</p>
                    <div className="links">
                    <NavLink to="/discovery" className="back-link">Home page</NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
