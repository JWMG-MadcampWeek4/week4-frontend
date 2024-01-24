import "./Landing.css";
import { Login, Signup } from "./Identification";

export function Landing ({opt : opt, update : update}){
    
    return (
        <div className = "Landing">
            <div className = "intrologo"></div>
            <div className = "LandingIdentification">
                { (opt === 1) ? (<Login update = {update}/>) : (<Signup/>)
                }
            </div>
        </div>
    )
}