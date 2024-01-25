import "./Main.css";
import { Navbar } from "./Navbar";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

export function Main({id, nick}){

    const navigate = useNavigate();

    const shortsurlList = ['mvRw79EJdkU', 'GRmTksRYwXI', 'AEqzqC4lekM'];
    const makeurlList = ['vH15rSVO1H0?si=zOIJFcbxYgRsA5hv'];

    const [myshortsUrl, setMyshortsUrl] = useState([]);

    useEffect(() => {
    fetch("http://143.248.219.184:8080/get_url", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id : id })
            })
            .then(res => res.json())
            .then(res => {
                setMyshortsUrl(res.youtube_url);
            })
            .catch(error => {
                console.log("error!");
            });
    }, [myshortsUrl]);

    const reg_short = () => {
        fetch("http://143.248.219.184:8080/set_url", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id : id, url : 'mvRw79EJdkU' })
                })
                .then(res => res.json())
                .then(res => {
                    setMyshortsUrl(res.youtube_url);
                })
                .catch(error => {
                    console.log("error!");
                });
    }

    return (
        <>
        <Navbar/>
        <div className = "MainLanding">
            <div className = "Introduction">
                <div className = "Introtextarea">
                    <div className = "text200">Be Creative.</div>
                    <div className = "introdescript">쇼츠, 새로운 세계를 열다.</div>
                    <div className = "text200" onClick = {() => reg_short()}>추가하기</div>
                    <div className = "makeshortsbutton">
                        <div className = "makeshortsbuttontext" onClick = {() => navigate('/leading')}>나만의 쇼츠 만들러 가기</div>
                    </div>                
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

