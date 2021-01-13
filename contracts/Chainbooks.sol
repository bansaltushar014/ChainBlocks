pragma solidity 0.5.8;
pragma experimental ABIEncoderV2;

contract Chainbooks {
  
  uint bookNumber = 0;
  
   struct Ipfs {
    string[] allIpfs;
  }

  mapping(uint => address) bookId;
  mapping(address => Ipfs) Owner;
  

  function addBook(string memory ipfs, address author) public {
    bookId[bookNumber] = author;
    Owner[author].allIpfs.push(ipfs);
    bookNumber = bookNumber + 1;
  }
  
    function getAuthor(uint id) public view returns (address author) {
     return bookId[id];
   }
   
   function getIpfs(address author) public view returns (string[] memory) {
       return Owner[author].allIpfs;
   }
   
   function getBookId() public view returns(uint){
       return bookNumber;
   }
}
