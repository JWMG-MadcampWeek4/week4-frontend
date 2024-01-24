import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Theme from "../lib/Theme.json";
import "./Themechoice.css";

export function Themechoice({update: fun}) {
    
    /*
    selectedTheme : first theme (json file, user can type)
    selectedCategory : selected category (json file, user can type)
    */

    // List of objects
    const keyOfTheme = Object.keys(Theme);


    return (
      <>
        <ListWithButton className="theme" update={fun} list={keyOfTheme} />
      </>
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
      <div className = "themeitemsfullpage">
        <div className = "text200">
          Theme.
        </div>
        <div className = "text400">
          관심있는 주제를 골라보세요.
        </div>
        <div className = "themeitems">
          {list.map((item) => (
            <div className = "themeitembox" onClick = {() => handleItemClick(item)}>
              <div className = "themeitemtext">{item}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export function CategoryChoice({theme: theme, update: fun, goback: goback}){

  // List of objects
  const categoryList = Theme[theme];

  return (
  <div className = "categoryitemsfullpage">
      <ListCategory update = {fun} theme = {theme} list = {categoryList} goback = {goback}/>
  </div>
  )
}


// List items. If it hovers, we can choose.
export function ListCategory({update: fun, theme: theme, list: list, goback: goback}) {

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
      <div className = "text200">
          Category.
      </div>
      <div className = "text400">
          어떤 카테고리가 좋을까요?
      </div>
      <div className = "categoryitems">
          {list.map((item) => (
            <div className = "themeitembox" onClick = {() => handleItemClick(item)}>
              <div className = "themeitemtext">{item}</div>
            </div>
          ))}
        </div>    
      <div className = "inputcategory">
        <input type="text" value={textInput} onChange={handleInputChange} />
        <div onClick={handleUpdate} className = "categorysubmit">
          <div className = "categorysubmittext">제출하기</div>
        </div>
      </div>
      <div className = "goback" onClick = {() => goback()}>
          뒤로가기
      </div>
    </div>
  )
}

