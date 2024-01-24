import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Theme from "../lib/Theme.json";
import "./Themechoice.css";
import gsap from 'gsap';

export function Themechoice({update: fun}) {
    
    /*
    selectedTheme : first theme (json file, user can type)
    selectedCategory : selected category (json file, user can type)
    contentList : list of contents (5 elements, user can choose)
    content : final content, will be the value to be make script
    */
    const [contentList, setContentList] = useState([]);
    const [content, setContent] = useState("");

    // List of objects
    const keyOfTheme = Object.keys(Theme);

    // Navigation
    const navigate = useNavigate();

    return (
      <>
        <ListWithButton className="theme" update={fun} list={keyOfTheme} />
      </>
    )
}

export function CategoryChoice({theme: theme, update: fun}){

  // List of objects
  const keyOfTheme = Object.keys(Theme);
  const categoryList = Theme[theme];

  // Rotating Disk
  useEffect(() => {
    const rotationAnimation = gsap.to('.fileblack_cat', {
      rotation: 360, 
      duration: 3,
      repeat: -1,
      ease: 'linear',
    });

    return () => {
      rotationAnimation.kill();
    };
  }, []);

  return (
  <div className = "categoryitems">
    <div className = "filezip">
    <div className = "fileblack_cat">
      <div className = "filered_cat">
        <div className = "fileempty_cat"></div>
      </div>
    </div>
    </div>
    <div className = "category">
      <h1 className = "text_playlist">PlayList</h1>
      <ListCategory update = {fun} theme = {theme} list = {categoryList}/>
    </div>
  </div>
  )
}


// List items. If it hovers, we can choose.
export function ListCategory({update: fun, theme: theme, list: list}) {

  // Text input
  const [textInput, setTextInput] = useState("직접입력");

  // Change the state of textInput.
  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  }

  // Call fun. (update function)
  const handleUpdate = () => {
    fun(textInput);
  }

  // If we click the category, store it.
  const handleItemClick = (item) => {
    if (item === "상관없음") {
      fun (theme);
    }
    else {
      fun (item);
    }
  }

  return(
    <div className = "categoryplaylist">
    {list.map((item) => (
        <div className = "categoryplay" onClick = {() => handleItemClick(item)}>
          {item}
        </div>
    ))}      
      <div className = "inputcategory">
        <input type="text" value={textInput} onChange={handleInputChange} />
        <button onClick={handleUpdate}>제출하기</button>
      </div>
    </div>
  )
}


// List items with button. Clickable induces changes.
export function ListWithButton({update: fun, list: list}) {
  

    const [selectedItem, setSelectedItem] = useState("");
    
    const handleItemClick = (item) => {
        setSelectedItem(item);        
        fun(item);
    }

    return(
        <div className = "themeitems">
        {list.map((item) => (
            <div className = "fileback" data-item = {item} onClick={() => handleItemClick(item)}>
              <div className = "filefront">
                {item}
              </div>
              <div className = "fileblack">
                <div className = "filered">
                <div className = "fileempty"></div>
                </div>
              </div>
            </div>
        ))}
      </div>
    )
}