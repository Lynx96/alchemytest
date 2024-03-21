// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.1;

contract HelloWorld {
    event UpdatedMessages(string oldStr, string newStr);

    string public message;
    address public owner;


    constructor(string memory initMessage){
        owner = msg.sender;
        message = initMessage;
    }

    function update(string memory newMessage) public {
        
        string memory oldMsg = message;
        message = newMessage;
        emit UpdatedMessages(oldMsg, newMessage);
    }
}


