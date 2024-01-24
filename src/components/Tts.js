import React, { useState, useEffect } from 'react';
import $ from 'jquery';

export function Tts({theme, category, update}) {
  
  const [script, setScript] = useState('');
  const [recommendlist, setRecommendlist] = useState([]);
  const [recommend, setRecommend] = useState('');
  const [audioContent, setAudioContent] = useState(null);

  const audioFile = new Audio();

  // Get recommended contents when script is given.
  useEffect(() => {
    if (theme === "동물") {
    fetch("http://143.248.219.169:8080/animal_theme", {
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
      fetch("http://143.248.219.169:8080/theme", {
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
  const onSelectRecommend = (e) => {
    setRecommend(e);
  }

  // Get a script.
  const getScript = () => {
    console.log(recommend);
      fetch("http://143.248.219.169:8080/script", {
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


  // Get audio content at audioContent.
  const getAudioContent = (e) => {
    setAudioContent(e);
  };


  // Make voice. (TTS Change)
  const handleTestButtonClick = () => {
    scriptToAudioContent({script: script, onChange: getAudioContent})
  };

  // Play or pause.
  const playAudioContent = () => {
    
    if (audioContent !== null) {
      if (audioFile.paused) {
        const audioBlob = base64ToBlob(audioContent, 'mp3');
        audioFile.src = window.URL.createObjectURL(audioBlob);
        audioFile.play();
      } else {
        audioFile.pause();
      }
    }
  }

  // Download with mp3.
  const downloadClick = () => {
    downloadMp3({audioContent: audioContent});
  };

  return (
      <div>
        <div>
          {recommendlist.length > 0 ? (
            recommendlist.map((item) => 
            <div onClick = {() => onSelectRecommend(item)}>{item}</div>
            )
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div onClick = {() => getScript()}>
          Make a script.
        </div>
        <textarea
          id="testInput"
          rows="5"
          cols="20"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        ></textarea>
        <button onClick={() => handleTestButtonClick()}>TTS 변환</button>
        <button onClick={() => playAudioContent()}>재생 혹은 정지</button>
        <button onClick={() => downloadClick()}>다운로드</button>
        <textarea id="textVal" rows="5" cols="20" value={audioContent}></textarea>
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
