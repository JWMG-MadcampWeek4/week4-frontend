import "./Identification.css";
import {useState, useEffect} from 'react';

export function Signup() {
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onChangeId = (id) => {
    setUserId(id);
  }

  const onChangeNick = (nick) => {
    setUserNick(nick);
  }

  const onChangePassword = (password) => {
    setUserPassword(password);
  }

  const doubleCheck = (e) => {
    console.log(userId);
    e.preventDefault();
    fetch("http://143.248.219.4:8080/signup_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId }) // send data
    })
    .then(res => res.json())
    .then(res => {
        if(res.exist) {

            // Usable Id.
            console.log("Change the id");
        }
        else {
            // Duplicated Id.
            setIsChecked(true);
            console.log("Success");
        }
    })
    .catch(error => {
        console.log("error!");
    });
  }

  const handleSubmit = (e) => {
    
    // Check duplication
    if(isChecked){
      
        fetch("http://143.248.219.4:8080/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: userId, nickname: userNick, password: userPassword }) // send data
        })
        .then(res => res.json())
        .then(res => {
            console.log("success!");
        })
        .catch(error => {
            console.log("error!");
        });
    }
    
    // NO duplicated check.
    else {
        console.log("Check duplication");
    } 
  };

  return (
    <>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => onChangeId(e.target.value)}
        />
      </div>
      
      <div>
        <button type="button" onClick = {doubleCheck}>Doublecheck button</button>
      </div>
      
      <div>
        <label htmlFor="userNick">User Nick:</label>
        <input
          type="text"
          id="userNick"
          value={userNick}
          onChange={(e) => onChangeNick(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="userPassword">User Password:</label>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </div>
      
      <div>
        <button onClick = {handleSubmit}>Sign Up</button>
      </div>
    </>
  );
}



export function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onChangeId = (id) => {
    setUserId(id);
  }

  const onChangePassword = (password) => {
    setUserPassword(password);
  }

  const handleSubmit = (e) => {
    
    fetch("http://143.248.219.4:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId, password: userPassword }) // send data
    })
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            console.log("login success");
        }
        else {
            console.log("login fail");
        }
    })
    .catch(error => {
        console.log("network error");
    }); 
  };

  return (
    <>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => onChangeId(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="userPassword">User Password:</label>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </div>

      <div>
        <button type = "button" onClick = {handleSubmit}>Login</button>
      </div>

    </>
  );
   
}