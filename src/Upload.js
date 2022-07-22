import React from "react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Web3Storage } from "web3.storage";
import Certification from "./artifacts/contracts/Certification.sol/Certification.json";
import { ethers } from "ethers";

function getAccessToken() {
  return `${process.env.REACT_APP_ACCESS_TOKEN}`;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

const Upload = () => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [contractAddress, setContractAddress] = useState("");

  const deployDocument = async (name, regNo, fileName, ipfsHash) => {
    console.log(fileName);
    try {
      const { ethereum } = window;
      if (ethereum) {
        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const certificationFactory = new ethers.ContractFactory(
          Certification.abi,
          Certification.bytecode,
          signer
        );
        const certificate = await certificationFactory.deploy(
          name,
          regNo,
          fileName,
          ipfsHash
        );
        await certificate.deployed();
        setContractAddress(certificate.address);
        console.log("Contract deployed to:", certificate.address);
      } else {
        console.log("Ethereum object doesn't exist!");
        alert("Get Metamask");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("No file selected");
      return null;
    }
    if (!name) {
      alert("Enter name");
      return null;
    }
    if (!regNo) {
      alert("Enter reg_no");
      return null;
    }
    try {
      const cid = await storeFiles(selectedFile);
      await deployDocument(name, regNo, fileName, cid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={regNo}
          placeholder="Registration No"
          onChange={(e) => setRegNo(e.target.value)}
        />
        <input
          type="file"
          placeholder="upload"
          onChange={(e) => {
            setFileName(e.target.files[0].name);
            setSelectedFile(e.target.files);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {contractAddress && (
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode value={contractAddress} />
        </div>
      )}
    </div>
  );
};

export default Upload;
