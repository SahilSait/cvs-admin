//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Certification {
    string public name;
    string public regNo;
    string public fileName;
    string public ipfsHash;

    constructor(
        string memory _name,
        string memory _regNo,
        string memory _fileName,
        string memory _ipfsHash
    ) {
        name = _name;
        regNo = _regNo;
        fileName = _fileName;
        ipfsHash = _ipfsHash;
    }
}
