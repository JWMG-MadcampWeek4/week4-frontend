import "./Leading.css"
import { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom";

export function Leading() {
    
    const navigate = useNavigate();
    
    const goToMake = () => {
        setTimeout(() => {
          navigate('/make');
        }, 1000);
    };

    return (
        <>
        <Navbar/>
        <div className = "MainLeading">
            <div className = "LeadingTop">
                <div className = "LeadingToptextarea">
                    <div className = "text200">Make Your Shorts.</div>
                    <div className = "introdescript">This is another way to convey your knowledge.</div>
                </div>
            </div>
            <div className = "makeshortsbutton">
                <div className = "makeshortsbuttontext" onClick = {() => goToMake()}>Let's Go.</div>
            </div>
        </div>
        </>
    )
}