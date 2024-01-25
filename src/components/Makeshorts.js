import { useState, useEffect, React, useRef } from "react";
import "./Makeshorts.css";
import { Navbar } from "./Navbar.js";
import { CategoryChoice, Themechoice } from "./Themechoice.js";
import { Tts } from "./Tts.js";
import { ChooseImage } from "./ChooseImage.js";
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useNavigate } from "react-router-dom";

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
    gsap.registerPlugin(MotionPathPlugin);

    const navigate = useNavigate();

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

    // gsap animation to show.
    useEffect(() => {
        const backOfRecord = document.querySelector('.backofrecord');
        const recordImage = document.querySelector('.recordimage');
        const makeshortscontentpage = document.querySelector('.makeshortscontentpage');
        
        gsap.set(backOfRecord, { x: '30vw', y: '0vh', opacity: 0, transformOrigin: 'center center' });
        gsap.to(backOfRecord, { duration: 2, opacity: 1, ease: 'power2.inOut' });
        gsap.set(recordImage, { rotation: 0, transformOrigin: 'center center' });
        gsap.to(recordImage, { duration: 4, rotation: 360, repeat: -1, ease: 'linear', delay : 3 });
        gsap.to(backOfRecord, { duration: 2, x: '-50%', ease: 'power2.inOut', delay: 5 });
        gsap.to(makeshortscontentpage, { duration: 1, x: '-12.5vw', y: '0', opacity: 1, ease: 'power2.inOut', delay: 7 });
    }, []);


    // Step changes
    const goFront = () => {
        if(step == 11) setStep(12);
        else if(step == 12) setStep(21);
        else if(step == 21) setStep(31);
        else {
            // after the final step
            setStep(11);
            navigate("/main");
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
    }
    else if (step === 12) {
        page = <CategoryChoice theme = {theme} update = {onChangeCategory} goback = {goBack}/>
    }
    else if (step === 21) {
        page = <Tts theme = {theme} category = {category} update = {onChangeScript}/>;
    }
    else {
        page = <ChooseImage theme = {theme} category = {category} script = {script} update = {onChangeImage} goback = {goBack} gofront = {goFront}/>
    }

    const audioRef = useRef(null);

    const playAudio = () => {
        const recordImage = document.querySelector('.recordimage');
      
        if (audioRef.current.paused) {
          audioRef.current.play();
          gsap.set(recordImage, { rotation: 0, transformOrigin: 'center center' });
          gsap.to(recordImage, { duration: 2, rotation: 360, repeat: -1, ease: 'linear', transformOrigin: 'center center' });
        } else {
          audioRef.current.pause();
          gsap.killTweensOf(recordImage);
          gsap.set(recordImage, { rotation: 0, transformOrigin: 'center center' });
        }
    };

    return (
    <div className = "makeshortsfullpage">
        <div className = "backofrecord">
            <div className = "recordimage" onClick = {() => playAudio()}>
                <audio ref={audioRef} src= "/FreestyleY.mp3"/>
            </div>
        </div>
        <div className = "makeshortscontentpage">
            {page}
        </div>
    </div>
    )
}