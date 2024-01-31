import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import "./Tts.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export function Tts({theme, category, update}) {
  
  const [script, setScript] = useState("대본이 여기에 담깁니다. 수정도 가능해요.");
  const [recommendlist, setRecommendlist] = useState([]);
  const [recommend, setRecommend] = useState(null);
  const [audioContent, setAudioContent] = useState(null);
  const [audioDuration, setAudioDuration] = useState("Time");

  const audioFile = new Audio();

  // Get recommended contents when script is given.
  useEffect(() => {
    if (theme === "동물") {
    fetch("http://143.248.219.184:8080/animal_theme", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ theme: category }) // send data
        })
        .then(res => res.json())
        .then(res => {
            setRecommendlist(res);
        })
        .catch(error => {
            console.log("error!");
        });
    }
    else {
      fetch("http://143.248.219.184:8080/theme", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ theme: category }) // send data
        })
        .then(res => res.json())
        .then(res => {
            setRecommendlist(res);
        })
        .catch(error => {
            console.log("error!");
        });
    }

  }, [category]);
  
  // Select recommend.
  const onSelectRecommend = ({item, cont}) => {
    setRecommend(item);
    cont.style.backgroundColor = '#4287f5';
    cont.style.border = '3px solid #4287f5';

    const allRecommendedContents = document.querySelectorAll('.recommendedcontent');
    allRecommendedContents.forEach((el) => {
      if (el !== cont) {
        el.style.backgroundColor = '';
        el.style.border = '';
      }
    });
  }

  // Get a script.
  const getScript = () => {
    if(recommendlist.length > 0){
      if(recommend) {
        setScript("대본을 가져오는 동안 잠시만 기다려주세요.");
      fetch("http://143.248.219.184:8080/script", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ content: recommend }) // send data
      })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          setScript(res.join(""));
      })
      .catch(error => {
          console.log("error!");
      });
    }
    else {
      alert("컨텐츠를 선택해주세요.");
    }
    }
    else {
      alert("잠시 기다려주세요.");
    }
  }


  // Get audio content at audioContent.
  const getAudioContent = (e) => {
    setAudioContent(e);
  };


  // Make voice. (TTS Change)
  const handleTestButtonClick = () => {
    scriptToAudioContent({script: script, onChange: getAudioContent})
    
  };

  // Get recommended contents when script is given.
  useEffect(() => {
    fetch("http://143.248.219.184:8080/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ script : script }) // send data
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
            const intminutetime = Math.floor(res.presentation_time_minutes);
            var minutetime = String(intminutetime);
            var sectime = String((res.presentation_time_seconds)%60);
            console.log(minutetime, sectime);
            if (res.presentation_time_seconds < 10) {
              sectime = "0" + sectime;
              console.log("change", sectime);
            }
            if(intminutetime <= 0) {setAudioDuration("00:" + sectime)}
            else {
              if(intminutetime < 10) {setAudioDuration("0" + minutetime + ":" + sectime)}
              else {
                setAudioDuration(minutetime + ":" + sectime)
              }
            }
        })
        .catch(error => {
            console.log("error!");
        });

  }, [script]);

  // Play or pause.
  const playAudioContent = () => {
    
    if (audioContent !== null) {
      if(audioFile.paused){
        const audioBlob = base64ToBlob(audioContent, 'mp3');
        audioFile.src = window.URL.createObjectURL(audioBlob);
        audioFile.play();
      }
    }
    else {
      alert("잠시만 기다려주세요.");
    }
  }

  const pauseAudioContent = () => {
    if(!audioFile.paused){
      audioFile.pause();
    }
  }

  // Download with mp3.
  const downloadClick = () => {
    downloadMp3({audioContent: audioContent});
  };

  return (
      <div className = "ttsfullpage">
        <div className = "text200">
          Script.
        </div>
        <div className = "text400">
          주제를 고르고, 대본을 받아보세요.
        </div>
        <div className = "ttscontentpage">
          <div className = "ttsthemepage">
            <div className = "recommendedcontentslist">
            {recommendlist.length > 0 ? (
              recommendlist.map((item) => 
              <div onClick = {(event) => onSelectRecommend({item:item, cont: event.currentTarget})} className = "recommendedcontent">
                <div className = "text500">{item}</div>
              </div>
              )
            ) : (
              <div className = "recommendedloading"><div className = "text400">기다려주세요...</div></div>
            )}
            </div>
            <div className = "scriptmakebutton" onClick = {() => getScript()}>
              <div className = "text500">
                {(recommendlist.length > 0) ? (
                  (recommend) ? (
                    `Make a Script.`
                  ) : (
                    `Select a Content.`
                  )
                ) : (
                  `Wait.`
                )}
              </div>
            </div>
          </div>
          <div className = "ttsscriptpage">
            <div className = "ttstextarea">
            <textarea
            id="testInput"
            rows="5"
            cols="20"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            ></textarea>
            <div className = "voicemethod">
                <PlayArrowIcon className = "voiceicon" onClick={() => playAudioContent()}/>
                <PauseIcon className = "voiceicon" onClick={() => pauseAudioContent()}/>
                <FileDownloadIcon className = "voiceicon" onClick={() => downloadClick()}/>
            </div>
            <div className = "voiceduration">
                  {audioDuration}
            </div>
            </div>
            <div className = "ttsmethod">
              <div className = "makettsbutton" onClick={() => handleTestButtonClick()}> <div className = "text500">
                Make TTS.
              </div></div>
              <div className = "makettsbutton" onClick={() => update(script)}> <div className = "text500">Make Image.</div></div>
            </div>
          </div>
        </div>
      </div>
  );
}

// Function that obtains audio content.
export function scriptToAudioContent({script, onChange}){
    const data = {
        voice: {
          languageCode: 'ko-KR',
        },
        input: {
          text: script,
        },
        audioConfig: {
          audioEncoding: 'mp3',
        },
    };

    $.ajax({
        type: 'POST',
        url:
          'https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBPjgAA75jWdqlL_pbjyH9LVEkMZRfS5cU',
        data: JSON.stringify(data),
        dataType: 'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function (res) {
          onChange(res.audioContent);
        },
        error: function (request, status, error) {
          alert('오류', 'TTS 음성을 가져오는 데 실패했습니다.');
        },
    });
}


// Function that makes script to voice.
export function scriptToVoice({audioContent: audioContent}) {
    
    const audioFile = new Audio();
    const audioBlob = base64ToBlob(audioContent, 'mp3');
    audioFile.src = window.URL.createObjectURL(audioBlob);
    audioFile.playbackRate = 1; // Adjust playback rate if needed
    audioFile.play();

}

// Download audio file from audio content.
export function downloadMp3({audioContent: audioContent}){
    
    const audioBlob = base64ToBlob(audioContent, 'mp3');

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(audioBlob);
    downloadLink.download = 'script_audio.mp3';

    // Append the link to the body and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);

}


// Function that changes base64 to blob. (Decoding)
const base64ToBlob = (base64, fileType) => {
    const typeHeader = `data:application/${fileType};base64,`;
    const audioSrc = typeHeader + base64;
    const arr = audioSrc.split(',');
    const array = arr[0].match(/:(.*?);/);
    const mime = (array && array.length > 1 ? array[1] : fileType) || fileType;

    const bytes = window.atob(arr[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
      type: mime,
    });
};
