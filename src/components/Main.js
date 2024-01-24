import "./Main.css";
import { Navbar } from "./Navbar";
import YouTube from "react-youtube";

export function Main(){

    const shortsurlList = ['mvRw79EJdkU', 'GRmTksRYwXI', 'AEqzqC4lekM'];
    const makeurlList = ['vH15rSVO1H0?si=zOIJFcbxYgRsA5hv'] 

    return (
        <>
        <Navbar/>
        <div className = "MainLanding">
            <div className = "Introduction">
                <div className = "Introtextarea">
                    <div className = "text200">Be Creative.</div>
                    <div className = "introdescript">쇼츠, 새로운 세계를 열다.</div>
                </div>
            </div>
            <div className = "myshorts">
                <div className = "myshortstextarea">내가 만든 쇼츠</div>
                <div className = "myshortsarea">
                    {shortsurlList.map((item) =>(
                    <div className = "myshortscontent">
                        <YouTube
                        videoId={item}
                        opts={{
                            width: "300",
                            height: "400",
                            playerVars: {
                            rel: 0,
                            modestbranding: 1,
                            },
                        }} 
                        onEnd={(e)=>{e.target.stopVideo(0);}}      
                        />
                    </div>
                    ))}
                </div>
            </div>
            <div className = "myshorts">
                <div className = "myshortstextarea">쇼츠, 이렇게 만들어보세요</div>
                <div className = "myshortsarea">
                    {makeurlList.map((item) =>(
                    <div className = "myshortscontent">
                        <YouTube
                        videoId={item}
                        opts={{
                            width: "300",
                            height: "400",
                            playerVars: {
                            rel: 0,
                            modestbranding: 1,
                            },
                        }} 
                        onEnd={(e)=>{e.target.stopVideo(0);}}      
                        />
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

