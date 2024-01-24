import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tts } from './components/Tts';
import { Textcheck } from './components/Textcheck';
import { Makeshorts } from './components/Makeshorts';
import { Main } from './components/Main';
import { Landing } from './components/Landing';
import { useState, useEffect } from 'react';

// Routing to sites
/*
signup - signup page
login - login page
make - make shorts page
text - check text page
*/
function App() {

  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");

  const onUserInfoChange = ({ id, nick }) => {
    setUserId(id);
    setUserNick(nick);
  }

  useEffect(() => {
  }, [userId, userNick]);

  return (
    <div className="App">
      <Router>
       <Routes>
          <Route exact path="/" element = {<Landing opt = {1}/>} />
          <Route exact  path = "/main" element = {<Main id = {userId} nick = {userNick}/>} />
          <Route exact path="/signup" element={<Landing opt = {0} />}/>
          <Route exact path="/login" element={<Landing opt = {1} update = {onUserInfoChange}/>}/>
          <Route exact path="/make" element={<Makeshorts />}/>
          <Route exact path="/tts" element={<Tts />}/>
          <Route exact path="/text" element={<Textcheck />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
