import { useState } from "react";
import "./Makeshorts.css";
import { Navbar } from "./Navbar.js";
import { CategoryChoice, Themechoice } from "./Themechoice.js";
import { Tts } from "./Tts.js";
import { ChooseImage } from "./ChooseImage.js";

export function Makeshorts(){

    /*
    Step describes what pages to load.
    11 : First page of theme page
    12 : Second page of theme page
    21 : Tts page
    31 : Image page
    */
    const [step, setStep] = useState(11);
    const [theme, setTheme] = useState("");
    const [category, setCategory] = useState("");
    const [script, setScript] = useState("");
    const [imageScriptList, setImageScriptList] = useState([]);
    const [imageUrlList, setImageUrlList] = useState([]);
    
    var page;
    var themestyle, scriptstyle, imagestyle;


    // PageBar setting
    const defaultPageBar = {
        transform: `translateX(0vw)`,
        width: `8vw`
    }

    const pointPageBar = {
        transform: `translateX(-2vw)`,
        width: `10vw`
    }

    // Update theme, category, script and image.
    const onChangeTheme = (e) => {
        setTheme(e);
        goFront();
    };

    const onChangeCategory = (e) => {
        setCategory(e);
        goFront();
    };

    const onChangeScript = (e) => {
        setScript(e);
        goFront();
    }

    const onChangeImage = ({imageScript, imageUrl}) => {
        setImageScriptList(imageScript);
        setImageUrlList(imageUrl);
    }

    // Step changes
    const goFront = () => {
        if(step == 11) setStep(12);
        else if(step == 12) setStep(21);
        else if(step == 21) setStep(31);
        else {
            // after the final step
        }
    }

    const goBack = () => {
        if(step == 12) setStep(11);
        else if(step == 21) setStep(12);
        else if(step == 31) setStep(21);
        else {
            // after the final step
        }
    }


    // Show different pages and different bar for each page.
    if (step === 11) {
        
        page = <Themechoice update = {onChangeTheme}/>;
        themestyle = pointPageBar;
        scriptstyle = defaultPageBar;
        imagestyle = defaultPageBar;

    }
    else if (step === 12) {
        
        page = <CategoryChoice theme = {theme} update = {onChangeCategory}/>
        themestyle = pointPageBar;
        scriptstyle = defaultPageBar;
        imagestyle = defaultPageBar;

    }
    else if (step === 21) {
        page = <Tts theme = {theme} category = {category} update = {onChangeScript}/>;
        themestyle = defaultPageBar;
        scriptstyle = pointPageBar;
        imagestyle = defaultPageBar;
    }
    else {
        page = <ChooseImage theme = {theme} category = {category} script = {script} update = {onChangeImage}/>
        themestyle = defaultPageBar;
        scriptstyle = defaultPageBar;
        imagestyle = pointPageBar;
    }


    return (
    <>
        <Navbar/>
        <div className = "backviolet">
            <div className = "backwhite">
                {page}
            </div>
            <div className = "items">
                <div className = "item_theme" style = {themestyle}></div>
                <div className = "item_script" style = {scriptstyle}></div>
                <div className = "item_image" style = {imagestyle}></div>
            </div>
        </div>
    </>
    )
}