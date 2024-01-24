import "./ChooseImage.css"
import {useState, useEffect} from 'react';

export function ChooseImage({theme, category, script, update}){

    const [imageScript, setImageScript] = useState(null);
    const [imageUrl, setImageUrl] = useState([require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png'), require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png'), require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png'), require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png'), require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png'), require('../lib/pics/bird.jpg'), require('../lib/pics/cheetah.png')]);
    //const [imageUrl, setImageUrl] = useState(null);
    const [view, setView] = useState(0);
    const [step, setStep] = useState(0);
    const mimeType = 'image/png';

    // function to change view.
    const onChangeView = ({view, step}) => {
        setView(view);
        setStep(step);
    }

    // function to get imageScript
    useEffect(() => {
        if (theme === "동물") {
        fetch("http://143.248.219.169:8080/animal_image_script", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ script: script, animal: category }) // send data
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.image_prompts);
                setImageScript(res.image_prompts);
            })
            .catch(error => {
                console.log("error!");
            });
        }
        else {
          fetch("http://143.248.219.169:8080/image_script", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ script : script }) // send data
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.image_script);
                setImageScript(res.image_script.slice(0, 12));
            })
            .catch(error => {
                console.log("error!");
            });
        }
    
      }, [script]);

    // function to get imageBlob list.

    useEffect(() => {
    if(imageScript) {
        fetch("http://143.248.219.169:8080/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ image_text_list : imageScript })
            })
            .then(res => res.json())
            .then(res => {
                setImageUrl(base64ListToURLList(res.base64_list, mimeType));
            })
            .catch(error => {
                console.log("error!");
            });
    }
    }, [imageScript])


    return (
        <div className = "cont">
            {(imageUrl) && (imageScript) ? (
                (view === 0) ? (
                    <ImageGrid imageUrlList={imageUrl} imageScriptList={imageScript} update={onChangeView} />
                ) : (
                    <ScrollGrid imageUrlList = {imageUrl} imageScriptList = {imageScript} update = {onChangeView} step = {step}/>
                )
            ) : (
                <p>Loading.</p>
            )}
        </div>
    )    
}

// grid image
const ImageGrid = ({imageUrlList, imageScriptList, update}) => {
    
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {imageUrlList.map((imageUrl, index) => (
          <div>
          <img
            key={`image-${index}`}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            style={{ width: '10vw', height: '15vw' }}
            onClick = {() => update({view : 1, step : index})}
          />
          <p>{imageScriptList[index]}</p>
          </div>
        ))}
      </div>
    )
}

// scroll image

const ScrollGrid = ({imageUrlList, imageScriptList, update, step}) => {
    
    const [text, setText] = useState(imageScriptList[step]);

    return (
    <div>
          <img
            key={`image-${step}`}
            src={imageUrlList[step]}
            alt={`Image ${step + 1}`}
            style={{ width: '10vw', height: '15vw' }}
          />
          <p>{imageScriptList[step]}</p>
          <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          <p></p>
          <p onClick = {() => update({view:1, step: Math.min(step + 1, 11)})}>다음으로</p>
          <p onClick = {() => update({view:1, step: Math.max(step - 1, 0)})}>이전으로</p>
          <p onClick = {() => update({view:0, step: step})}>그리드로 돌아가기</p>
    </div>
    )
}

// Change base64 to blob.
function base64ToBlob(base64String, mimeType) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: mimeType });
  }
  
  // change base64 to url.
  function base64ToURL(base64String, mimeType) {
    const blob = base64ToBlob(base64String, mimeType);
    return URL.createObjectURL(blob);
  }

  // change base 64 List to Url list.
  function base64ListToURLList(base64List, mimeType) {
    return base64List.map(base64Image => base64ToURL(base64Image, mimeType));
  }