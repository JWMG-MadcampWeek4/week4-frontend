import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Theme from "../lib/Theme.json";
import "./Themechoice.css";

export function Themechoice() {
    
    /*
    selectedTheme : first theme (json file, user can type)
    selectedCategory : selected category (json file, user can type)
    contentList : list of contents (5 elements, user can choose)
    content : final content, will be the value to be make script
    */
    const [selectedTheme, setSelectedTheme] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [contentList, setContentList] = useState([]);
    const [content, setContent] = useState("");

    // Select Theme
    const onSelectTheme = (e) => {
        setSelectedTheme(e);
        setSelectedCategory(e); // Theme cannot have category
    };

    // Set Category
    const onSelectCategory = (e) => {
      setSelectedCategory(e);
    }

    // Get recommendation and select content
    const onSelectContent = (e) => {
      setContent(e);
    }

    // List of objects
    const keyOfTheme = Object.keys(Theme);

    // Navigation
    const navigate = useNavigate();
    const navigateToTts = () => {
      navigate('/tts')
  };


    
    // Submit Theme, category pair and get recommendation.
    const handleSubmitTheme = () => {
      fetch("http://143.248.219.4:8080/theme", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ theme: selectedCategory }) // send data
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setContentList(res);
        })
        .catch(error => {
            console.log("error!");
        });
    }

    // Choose final content and make a script
    const handleSubmitContent = () => {
      console.log(content);
      fetch("http://143.248.219.4:8080/script", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: content }) // send data
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            navigateToTts();
        })
        .catch(error => {
            console.log("error!");
        });
    }


    return (
      <>
      <h1 className="primary-heading">
        주제를 선택하세요.
      </h1>
      <h1 className="medium-primary-heading">
        카테고리를 선택하세요.
      </h1>
      <ListWithButton className="theme" update={onSelectTheme} list={keyOfTheme} />
      <ListWithButton
        className="category"
        update={onSelectCategory}
        list={Theme[selectedTheme] || []}
      />
      <ListWithButton
        className="recommend"
        update={onSelectContent}
        list={contentList || []}
      />
      <button className = "primary-button" onClick = {handleSubmitTheme}>검색하기</button>
      <button className = "primary-button" onClick = {handleSubmitContent}>대본얻기</button>
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
        <div style={{ height: '800px', overflowY: 'scroll' }}>
        {list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className={`city-item ${item === selectedItem ? 'selected' : ''}`}
            style={{
              height: '10%',
              width: '20%',
              borderRadius: '40px',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
              marginBottom: '20px',
              margin: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
          }}
          >
            <h1 className = "small-primary-heading" style = {{margin: '10px', flex: '1'}}>{item}</h1>
          </div>
        ))}
      </div>
    )
}