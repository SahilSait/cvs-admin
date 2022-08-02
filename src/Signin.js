import React, { useEffect, useState } from "react";
import metamask from "./assets/metamask.svg";
import { ethers } from "ethers";
import slogo from "./assets/logo.png";
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
      <img className="u1img" src={slogo} width={200} height={200}></img>
      {haveMetamask ? (
        <div className="appheader">
          {isConnected ? (
            <div className="address">
              <h3>Wallet Address:</h3>
              <p className="address2" type="address2">{accountAddress}</p>
              <p className="info"> CONNECTED ✓</p>
              <Link to="/upload">
                <button className="documentsupload" type="DOCUMENTS UPLOAD">
                   UPLOAD DOCUMENTS</button>
              </Link>
            </div>
          ) : (
            <div className="button1">
              <button className="sbutton" type="login" onClick={connectWallet}>
                Login with Metamask ‎ ‎
                <img className="u2img" src={metamask} width={25} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
      <p className="sabout">
        <a className="s1about" href="www.google.com">
          About Us
        </a>
      </p>
    </div>
  );
}

export default Signin;
