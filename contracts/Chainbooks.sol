pragma solidity 0.5.8;
pragma experimental ABIEncoderV2;

contract Chainbooks {
  
  uint bookNumber = 0;
  
   struct Ipfs {
    string[] allIpfs;
  }

  mapping(uint => address) bookId;
  mapping(address => Ipfs) Owner;
  
  // Add Book hashes owned by the Author
  function addBook(string memory ipfs, address author) public {
    bookId[bookNumber] = author;
    Owner[author].allIpfs.push(ipfs);
    bookNumber = bookNumber + 1;
  }
  
  // Get the author address on the base of bookNumber
  function getAuthor(uint id) public view returns (address author) {
     return bookId[id];
   }
   
  //  Get the Hashes owned by the Author
   function getIpfs(address author) public view returns (string[] memory) {
       return Owner[author].allIpfs;
   }
   
  //  Return the Number of Author Addresses registered
   function getBookId() public view returns(uint){
       return bookNumber;
   }
}
