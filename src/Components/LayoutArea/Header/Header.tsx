import "./Header.css";

/**
 * Header component for displaying the header section with a logo image.
 */
function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={"/the-coupon-emporium-high-resolution-logo-transparent (2).png"} alt={"Logo image"}/>
        </div>
    );
}

export default Header;
