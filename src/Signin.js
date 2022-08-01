import React from "react";
import metamask from "./assets/metamask.svg";
import slogo from "./assets/slogo.png"
function Signin() {
  return (
    <div>
      <div className="outer">
        <img className="simg"
          src={slogo}
          width={200}
          height={200}
        ></img>
        <br></br>
        <button className="sbutton" type="login">
          Login with Metamask ‎  ‎    
          <img src={metamask} 
          width={25} />
        </button>
        <br></br>
        <p className="sabout">
          <a className="s1about" href="www.google.com"
        
          >About Us</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
