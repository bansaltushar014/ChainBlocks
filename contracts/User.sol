pragma solidity 0.5.8;
pragma experimental ABIEncoderV2;

contract User {
  
   struct MyUser {
    string[] ipfs;
  }

  mapping(address => MyUser) myusers;

  function set(string memory x) public {
    myusers[msg.sender].ipfs.push(x);
  }
  
    function get() public view returns (string[] memory) {
    
     return myusers[msg.sender].ipfs;
   }
}
