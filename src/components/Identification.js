import "./Identification.css";
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export function Signup() {
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [doubleCheckState, setDoubleCheckState] = useState("Please DoubleCheck.");
  const [finalCheck, setFinalCheck] = useState(false);

  const navigate = useNavigate();

  const onChangeId = (id) => {
    setUserId(id);
  }

  const onChangeNick = (nick) => {
    setUserNick(nick);
  }

  const onChangePassword = (password) => {
    setUserPassword(password);
  }

  const doubleCheck = () => {
    
    //e.preventDefault();
    fetch("http://143.248.219.169:8080/signup_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId }) // send data
    })
    .then(res => res.json())
    .then(res => {
        if(res.exist) {
            setIsChecked(false);
            setFinalCheck(false);
            setDoubleCheckState("Invalid ID.");
        }
        else {
            setIsChecked(true);
            setDoubleCheckState("Useable ID.")
        }
    })
    .catch(error => {
        console.log("error!");
    });
  }

  const handleSubmit = (e) => {
    
    if(isChecked){
      if (!finalCheck){
        fetch("http://143.248.219.169:8080/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: userId, nickname: userNick, password: userPassword }) // send data
        })
        .then(res => res.json())
        .then(res => {
            setFinalCheck(true);
        })
        .catch(error => {
            alert("관리자에게 문의하세요.");
        });
      }
      else {
        navigate('/login');
      }
    }
    // NO duplicated check.
    else {
        alert("Please DoubleCheck.");
    } 
  };

  return (
    <div className = "SignUpPlace">
      <div className = "SignUpText">Sign Up</div>
      <div className = "SignUpInput">
        <div className = "SignUpidInput">
          <div className = 'text400'>ID</div>
          <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => onChangeId(e.target.value)}
        />
        </div>
        <div className = "doubleCheck">
          <div className = "doubleCheckbutton" onClick  = {() => doubleCheck()}>DoubleCheck</div>
          <div className = "doubleCheckResult">{doubleCheckState}</div>
        </div>
        <div className = "SignUpnickInput">
          <div className = 'text400'>Nick.</div>
          <input
          type="text"
          id="userNick"
          value={userNick}
          onChange={(e) => onChangeNick(e.target.value)}
        />
        </div>
        <div className = "SignUppasswordInput">
          <div className = 'text400'>PW</div>
          <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        </div>
      </div>
      <div className = "SignUpButton" onClick = {() => handleSubmit()}>
        <div className = "SignUpButtonText">
          {finalCheck ? ('Let\'s Login.') : ('Click to Sign Up.')}
        </div>
      </div>
    </div>
  );
}



export function Login({update:update}) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onChangeId = (id) => {
    setUserId(id);
  }

  const onChangePassword = (password) => {
    setUserPassword(password);
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    fetch("http://143.248.219.169:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId, password: userPassword }) // send data
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
          update({id : res.id, nick : res.nickname})
          navigate({pathname: "/main"});
        }
        else {
            alert("Access Denied.");
        }
    })
    .catch(error => {
        alert("관리자에게 문의하세요.");
    }); 
  };

  return (
    <div className = "LoginPlace">
      <div className = "LoginText">Login</div>
      <div className = "LoginInput">
        <div className = "idInput">
          <div className = 'text400'>ID</div>
          <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => onChangeId(e.target.value)}
          />
        </div>
        <div className = "passwordInput">
          <div className = 'text400'>PW</div>
          <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => onChangePassword(e.target.value)}
          />
        </div>
      </div>
      <div className = "loginButton" onClick = {() => handleSubmit()}>
        <div className = "loginText">
          Let's Be Creative.
        </div>
      </div>
      <div className = "movetoSignUp" onClick = {() => navigate('/signup')}>
        For Sign Up, Click Here.
      </div>
    </div>
  );
}