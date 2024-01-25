import "./ChooseImage.css"
import {useState, useEffect} from 'react';
import { gsap } from "gsap/gsap-core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

export function ChooseImage({theme, category, script, update, goback}){

    const [imageScript, setImageScript] = useState(null);
    const [imageUrl, setImageUrl] = useState([require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg"), require("../lib/pics/loading.jpg")]);
    const [getanimage, setGetanimage] = useState(true);
    const [view, setView] = useState(0);
    const [step, setStep] = useState(0);
    const mimeType = 'image/png';

    // function to change view.
    const onChangeView = ({view, step}) => {
        setView(view);
        setStep(step);
    }

    // Modify index of imageUrl.
    const modifyImageUrl = ({index, newValue}) => {
        const updatedImageUrl = [...imageUrl];
        updatedImageUrl[index] = newValue;
        setImageUrl(updatedImageUrl);
    };

    // Modify index of imageScript.
    const modifyImageScript = ({index, newValue}) => {
        const updatedImageScript = [...imageScript];
        updatedImageScript[index] = newValue;
        setImageScript(updatedImageScript);
    };

    // Remove element.
    const removeElement = (index) => {
        const updatedImageScript = [...imageScript];
        const updatedImageUrl = [...imageUrl];
        updatedImageScript.splice(index, 1);
        setImageScript(updatedImageScript);
        updatedImageUrl.splice(index, 1);
        setImageUrl(updatedImageUrl);
    };

    // Append element.
    const appendImageUrl = (newValue) => {
        setImageUrl([...imageUrl, newValue]);
    };

    const appendImageScript = (newValue) => {
        setImageScript([...imageScript, newValue]);
    };

    // function to get imageScript
    useEffect(() => {
        if (theme === "동물") {
        fetch("http://143.248.219.184:8080/animal_image_script", {
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
          fetch("http://143.248.219.184:8080/image_script", {
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
    if(imageScript && getanimage) {
        fetch("http://143.248.219.184:8080/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ image_text_list : imageScript })
            })
            .then(res => res.json())
            .then(res => {
                setImageUrl(base64ListToURLList(res.base64_list, mimeType));
                setGetanimage(false);
            })
            .catch(error => {
                console.log("error!");
            });
    }
    }, [imageScript])

    const downloadAll = () => {
        if(imageUrl && imageScript) {
            if(imageUrl.length > 0 && imageScript.length > 0) {
                downloadImageList(imageUrl, imageScript)
            }
        }
        else {
            alert("잠시만 기다렸다가 실행해주세요.");
        }
    }


    return (
        <div className = "imagefullpage">
            <div className = "text200">
            Image.
            </div>
            <div className = "text400">
            영원한 건 절대없어, 결국에 넌 ai를 쓰지.
            </div>
            <div className = "imagecontentpage">
                <div className = "imagescriptpage">
                    <div className = "imagetextarea">
                    <textarea
                    id="testInput"
                    rows="5"
                    cols="20"
                    value={script}
                    ></textarea>
                    <div className = "text500" onClick = {() => goback()}>대본 다시쓰기</div>
                    </div>
                </div>
                <div className = "imageshowpage">
                <div className = "imagegallery">
                    <div className = "text400">AI Gallery</div>
                    <div className = "text500" onClick = {() => downloadAll()}>Download All.</div>
                </div>
                {(imageUrl) && (imageScript) ? (
                    (view === 0) ? (
                        <ImageGrid imageUrlList={imageUrl} imageScriptList={imageScript} update={onChangeView} deletefunc = {removeElement} appendImageScript = {appendImageScript} appendImageUrl = {appendImageUrl}/>
                    ) : (
                        <ScrollGrid imageUrlList = {imageUrl} imageScriptList = {imageScript} update = {onChangeView} step = {step} modifyImageScript={modifyImageScript} modifyImageUrl={modifyImageUrl}/>
                    )
                ) : (
                    <div className = "text300">Wait a Minute.</div>
                )}
                </div>
            </div>
        </div>
    )    
}

// grid image
const ImageGrid = ({imageUrlList, imageScriptList, update, deletefunc, appendImageUrl, appendImageScript}) => {
    
    const appendElement = () => {
        appendImageUrl(require("../lib/pics/loading.jpg"));
        appendImageScript("Apple");
    }

    return (

        <div className = "imagegridpage" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {imageUrlList.map((imageUrl, index) => (
            <div className = "imagegriditem">
                <img
                    key={`image-${index}`}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    style={{ width: '12.672vw', height: '22.176vw' }}
                    onClick = {() => update({view : 1, step : index})}
                />
                <div className = "imagegriditemdescription">
                    <div className = "imagegriditemword">{imageScriptList[index]}</div>
                    <div onClick = {() => deletefunc(index)} className = "imagedelete"><div className = "text500">삭제</div></div>
                </div>    
            </div>
            ))}
            <div className = "imagegriditemadd">
                <img
                    key={`imageadd`}
                    src={"/addiconwhite.png"}
                    alt={`Imageadd`}
                    style={{ width: '3vw', height: '3vw' }}
                    onClick = {() => appendElement()}
                />
            </div>
      </div>
    )
}

// scroll image

const ScrollGrid = ({imageUrlList, imageScriptList, update, step, modifyImageUrl, modifyImageScript}) => {
    
    const [text, setText] = useState(imageScriptList[step]);
    
    useEffect(() => {
        setText(imageScriptList[step])
    }, [step]);

    const regenerate = () => {
        console.log("comes in");
        console.log(text);
        fetch("http://143.248.219.184:8080/text2image", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ image_text : text }) // send data
            })
            .then(res => res.json())
            .then(res => {
                modifyImageUrl({index : step, newValue : base64ToURL(res.base64)});
                modifyImageScript({index : step, newValue : text});
            })
            .catch(error => {
                console.log("error!");
            });
    }


    return (
        <div className = "scrollgridpage">
            <div className = "phonetop">
                <div className = "phonetoplong"></div>
                <div className = "phonetopshort"></div>
            </div>
            <div className = "downloadthisimage">
                <DownloadIcon className = "downloadicon" onClick = {() => downloadImage({imageUrl: imageUrlList[step], fileName: imageScriptList[step]})}/>
            </div>
            <img
            key={`image-${step}`}
            src={imageUrlList[step]}
            alt={`Image ${step + 1}`}
            style={{ width: '18.75vw', height: '30.35vw' }}
            />
            <div className = "imagedetaildescription">
                <div className = "imagedetailtop">
                    <div className = "imagedetailcontent">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    </div>
                    <div className = "imagedetailregenerate">
                        <div className = "text500" onClick = {() => regenerate()}>
                            재생성
                        </div>
                    </div>
                </div>
                <div className = "imagedetailbottom">
                    {
                    (step === 0) ? 
                    (
                        <div className = "chooseimageicon">  </div>
                    ) :
                    (
                        <ArrowBackIcon className = "chooseimageicon" onClick = {() => update({view:1, step: Math.max(step - 1, 0)})}/>
                    )}
                    <div className = "imagegoback" onClick = {() => update({view:0, step: step})}>갤러리 보기</div>
                    {
                    (step === imageScriptList.length - 1) ? 
                    (
                        <div className = "chooseimageicon">  </div>
                    ) :
                    (
                        <ArrowForwardIcon className = "chooseimageicon" onClick = {() => update({view:1, step: Math.min(step + 1, imageScriptList.length - 1)})}/>
                    )}
                </div>
            </div>
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

  // download with imageurl
  function downloadImage({ imageUrl, fileName }) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
  
      const dataUrl = canvas.toDataURL('image/png');
  
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = fileName;
      
      downloadLink.click();
    };
    image.src = imageUrl;
  }

   // change base 64 List to Url list.
   function downloadImageList(imageUrlList, imageScriptList) {
    console.log("here");
    const downloadPromises = imageUrlList.map((imageUrl, index) => {
      const fileName = imageScriptList[index];
      return downloadImage({ imageUrl, fileName });
    });
  
    return Promise.all(downloadPromises);
  }