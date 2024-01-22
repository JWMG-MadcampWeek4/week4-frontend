import React, { useState } from 'react';
import $ from 'jquery';

export function Tts() {
  
  const [textValue, setTextValue] = useState('');
  const [audioContent, setAudioContent] = useState(null);

  // Get audio content at audioContent.
  const getAudioContent = (e) => {
    setAudioContent(e);
  };


  // Make voice.
  const handleTestButtonClick = () => {
    scriptToAudioContent({script: textValue, onChange: getAudioContent})
  };


  // Download with mp3.
  const downloadClick = () => {
    downloadMp3({audioContent: audioContent});
  };

  return (
    <div>
      <textarea
        id="testInput"
        rows="5"
        cols="20"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      ></textarea>
      <button onClick={handleTestButtonClick}>아작스실행</button>
      <button onClick={downloadClick}>다운로드</button>
      <textarea id="textVal" rows="5" cols="20" value = {audioContent}></textarea>
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
          scriptToVoice({audioContent : res.audioContent});
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
