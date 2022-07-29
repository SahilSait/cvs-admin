import React, { useEffect, useState } from "react";
import metamask from "./assets/metamask.svg";
import { ethers } from "ethers";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function Signin() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="outer">
      <img src={logo} width={300} height={300} alt="logo"/>
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="address">
                <h3>Wallet Address:</h3>
                <p>{accountAddress}</p>
                <p className="info"> Connected Successfully</p>
                <Link to="/upload"><button>DOCUMENTS UPLOAD</button></Link>
              </div>
            ) : (
              <div className="button1">
               <button className="btn" onClick={connectWallet}>
                Connect
              </button>
              <img src={metamask} width={40} className="App-logo" alt="logo" />
              </div>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      
    </div>
  );
}

export default Signin;
