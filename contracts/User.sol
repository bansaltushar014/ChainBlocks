pragma solidity 0.5.8;
pragma experimental ABIEncoderV2;

contract User {
  
   struct MyUser {
    string[] ipfs;
  }

  mapping(address => MyUser) myusers;

  // Save the Hash of books bought by the Reader
  function set(string memory x) public {
    myusers[msg.sender].ipfs.push(x);
  }
  
  // Get the Hashes of book bought by the Reader
  function get() public view returns (string[] memory) {
    return myusers[msg.sender].ipfs;
   }
}
