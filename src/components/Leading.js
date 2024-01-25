import React from 'react';
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
    const images = [
        '/puppy1.png', // Replace these with the actual paths to your image files
        '/puppy2.png',
        '/puppy3.png',
        '/panda1.png',
        '/쿼카.png',
        '/adorable cat.png',
        '/sleeping cat.png'
        
        // ... more image paths
    ];
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
                <div style={{ height: '100px' }}>
                </div>
                {/* 첫 번째 줄: 왼쪽에 사진, 오른쪽에 설명 */}
                <div className="SplitContainer">
                    <div className="ImageSection">
                        <img src="/Category.png" alt="설명" />
                    </div>
                    <div className="DescriptionSection">
                        <p>주제추천부터,</p>
                    </div>
                </div>
                {/* 첫 번째 줄: 왼쪽에 사진, 오른쪽에 설명 */}
                <div className="SplitContainer">
                    <div className="ImageSection">
                        <img src="/Image_all.png" alt="설명" />
                    </div>
                    <div className="DescriptionSection">
                        <p>대본, 이미지 모두!</p>
                    </div>
                </div>
                <div style={{ height: '100px' }}>
                </div>
                
                <div className="SplitContainerReverse">
                    <div className="ImageSectionReverse">
                        <img src="" alt="설명" />
                    </div>
                    <div className="DescriptionSectionReverse">
                        <p>나만의 이미지로 만드는 Shorts</p>
                    </div>
                </div>
                <div className="horizontal-scroll">
                    {images.map((src, index) => (
                        <img key={index} className="scroll-image" src={src} alt="Puppy" />
                    ))}
                </div>
                <div className = "makeshortsbutton">
                    <div className = "makeshortsbuttontext" onClick = {() => goToMake()}>Let's Go.</div>
                </div>
            </div>
        </>
    );
}