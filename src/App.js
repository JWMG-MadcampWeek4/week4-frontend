import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Signup, Login} from "./components/Identification"
import { Themechoice } from './components/Themechoice';
import { Tts } from './components/Tts';

// Routing to sites
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/themechoice" element={<Themechoice />}/>
          <Route exact path="/tts" element={<Tts />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
