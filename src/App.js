import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Signup, Login} from "./components/Identification"
import { Themechoice } from './components/Themechoice';
import { Tts } from './components/Tts';
import { Textcheck } from './components/Textcheck';
import { Makeshorts } from './components/Makeshorts';

// Routing to sites
/*
signup - signup page
login - login page
make - make shorts page
text - check text page
*/
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/make" element={<Makeshorts />}/>
          <Route exact path="/tts" element={<Tts />}/>
          <Route exact path="/text" element={<Textcheck />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
