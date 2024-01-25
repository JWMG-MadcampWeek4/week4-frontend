import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../lib/pics/DITTO.svg"
import "./Navbar.css";

export function Navbar({nick : nick}){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <div className = "navbar">
            <div className = "nav-logo-container" onClick = {navigateToHome}>
                <p className = "text400"> ShortsMaker.</p>
            </div>
            
            <div className="navbar-links-container">
                {isLoggedIn ? (
                    <div className = "text500" onClick={navigateToHome}>Log Out</div>
                ) : (
                    <div className = "text500" onClick={navigateToHome}>Welcome, {nick}</div>
                )}
            </div>
        </div>
    )
}