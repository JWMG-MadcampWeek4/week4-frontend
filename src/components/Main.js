import "./Main.css";
import { Navbar } from "./Navbar";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Modal from 'react-modal';

export function Main({id, nick}){

    const navigate = useNavigate();

    const shortsurlList = ['mvRw79EJdkU', 'GRmTksRYwXI', 'AEqzqC4lekM'];
    const makeurlList = ['vH15rSVO1H0?si=zOIJFcbxYgRsA5hv'];

    const [myshortsUrl, setMyshortsUrl] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [receivedDataUrl, setReceivedDataUrl] = useState(null);

    const openModal = () => {
        console.log("Here");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = (data) => {
        setReceivedDataUrl(data);
    };

    useEffect(() => {
        if(receivedDataUrl){
            fetch("http://143.248.219.184:8080/set_url", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id : id, url : receivedDataUrl })
            })
            .then(res => res.json())
            .then(res => {
                setMyshortsUrl(res.youtube_url);
            })
            .catch(error => {
                console.log("error!");
            });
        }
        
    }, [receivedDataUrl]);

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
        openModal();
    }

    return (
        <>
        <Navbar nick = {nick}/>
        <div className = "MainLanding">
            <div className = "Introduction">
                <div className = "Introtextarea">
                    <div className = "text200">Be Creative.</div>
                    <div className = "introdescript">쇼츠, 새로운 세계를 열다.</div>
                        <PopupComponent
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirm={handleConfirm}
                        />
                    <div className = "makeshortsbutton">
                        <div className = "makeshortsbuttontext" onClick = {() => navigate('/leading')}>나만의 쇼츠 만들러 가기</div>
                    </div>                
                </div>
            </div>
            <div className = "myshorts">
                <div className = "myshortstextzone">
                    <div className = "myshortstextarea">내가 만든 쇼츠</div>
                    <div className = "myshortstextarea" onClick = {() => reg_short()}>추가하기</div>
                </div>
                <div className = "myshortsarea">
                    { (myshortsUrl) ? (
                    
                    myshortsUrl.map((item) =>(
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
                    )) ) : (
                    
                        <div className = "emptyshortscontent"> 
                        <div className = "text400">쇼츠를 만들어볼까요?</div> 
                        </div>
                        
                        )
                
                } 
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



const PopupComponent = ({ isOpen, onClose, onConfirm }) => {
    const [data, setData] = useState('입력하세요.');
  
    const handleConfirm = () => {
      onConfirm(data);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} 
      onRequestClose={onClose}
      style={{
        content: {
          width: '30%',
          height: '20%',
          margin: 'auto',
          backgroundColor: 'black',
          borderRadius: '2rem',
        },
    }}
      >
        <div className = "modalrequest">등록할 쇼츠 Url 뒷부분을 입력하세요.</div>
        <div className = "modalrequest2">
            <div className = "text500">https://youtu.be/</div>
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
        </div>
        <div className = "modalbutton">
            <div className = "modalbuttondesign" onClick={handleConfirm}><div className = "modalbuttontext">확인</div></div>
            <div className = "modalbuttondesign" onClick={onClose}><div className = "modalbuttontext">취소</div></div>
        </div>
      </Modal>
    );
  };
  
  export default PopupComponent;