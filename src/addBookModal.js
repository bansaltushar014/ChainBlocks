import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './css/buttonFix.css';
import ipfsHelper from './ipfsHelper'
import Chainbooks from './contracts/Chainbooks.json';
import web3Obj from './helper'
import axios from "axios";
import './css/loader.css';

function Example() {
    const [show, setShow] = useState(false);
    const [secondShow, setSecondShow] = useState(false);
    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')


    const handleClose = () => {
        setShow(false);
    }

    const handleYes = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
        initialize();
    }

    const handleSecondClose = () => {
        setSecondShow(false);
    }

    const handleSecondShow = () => {
        setSecondShow(true);
    }

    const captureAuthorName = (event) => {
        
        let author = event.target.value;
        setAuthorName(author);
    }

    const captureBookName = (event) => {
        let book = event.target.value;        
        setBookName(book);
    }
          
    const [buffer, setBuffer] = useState([]);
    const [chainBookInstance, setChainBookInstance] = useState();
    const [setGeneratedHash] = useState(null);
   
    const initialize = () => {
        const chainBooksAbi = Chainbooks.abi;
        const chainBooksContractAddress = Chainbooks.networks[3].address;
        setChainBookInstance(new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress))

    }

    const captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
        }
        
    }

    const onSubmit = async (event) => {
        handleClose();
        event.preventDefault()
        console.log(bookName);
        console.log(authorName);
       await ipfsHelper.files.add(buffer, async (error, result) => {
            if (error) {
                console.error(error)
                return
            }

            setGeneratedHash(result[0].hash);
            const hash = result[0].hash;
            console.log("hash is "+ result[0].hash);
            console.log(buffer);
            console.log(chainBookInstance);
            await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
                await chainBookInstance.methods.getBookId().call({ from: accounts[0] })
                    .then((result) => {
                        console.log("Book Number has been received!" + result[0]);          
                        showLoading(hash, result[0]);
                    })
            })
        })
    }

    const showLoading = (hash, bookId) => {
        handleYes();
        handleSecondShow();
        console.log("Inside Showloading where hash is " + hash + " book id is "+bookId);
      
        savetoChainBook(hash, bookId);

    }

    const savetoChainBook = async (hash, bookId) => {
        // here azure will save this info and in chainbook we will send ipfs and address
        const authorAddress = randomAddress(bookId);
        console.log("author Address is "+ authorAddress);

        await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
            await chainBookInstance.methods.addBook(hash, authorAddress).send({ from: accounts[0] })
                .then((result) => {
                    console.log("Book Hash has been saved on ChainBooks!");          
                    savetoAzure(bookId);
                })
        })
    }

    const savetoAzure = (bookId) => {
        axios.post('http://localhost:4000/api/postChainData', {
            name: bookName,
            bookId: bookId,
            price: '200',
            By: authorName,
            image: 'http://placekitten.com/g/320/500',
          })
          .then(function (response) {
            console.log("Saved in Chainbook and in azure!");
            console.log(response);
            handleSecondClose();
            refreshPage();
          })
          .catch(function (error) {
            console.log(error);
          });
      
    }

    function refreshPage(){ 
        window.location.reload('http://localhost:3000/'); 
    }

    const randomAddress = (bookId) => {
        
        const address = ['0xaAb38be47F4b96A4f118d862eE1aF7138273c1b9',
                        '0xEBDfa54bb1CCB37Cd185F59d31e9E8c416b9b8Ed', 
                        '0x4CF0cbe6EA3DE7446820eB25Ba13dcd2d4F4d154',
                        '0xad88198E7D76f8D13FDfeb13Ad61da46240c5fdD',
                        '0x37AB42F500D6B52D0044B4C042d469295E59676b',
                        '0x5BDFC7558fa8F9018BF4159315FE207832a2C2eC',
                        '0x364c4999D9696b0A67469Ba617e7E842Fc55ccD1',
                        '0x76a8EB3ca72EeD7c12d0bd570Febb9507482641d', 
                        '0xDE0B9bA6cE21cC98A3ab1E6ba5e8de352bAF85A8',
                        '0x340905ab8f279436B297ADFc3A78B0d217B3218F',
                        '0x9D3ac8868805418c674114c18904f672C39e4a1C', 
                        '0x9A495d478941ADc65e50405d20278B2684a02000',
                        '0x9cBCbF8fd7cC8328fd73e616C4d7271f4b70e9Cb', 
                        '0x70c9c6d52fcEB68CdfFC38f1eA176b12A428C0A0',
                        '0xA661227A7d24f1354ce6a5a045Aa4eD8dF03aa1a', 
                        '0x0532227D85E212C4cCd3d3024E505fCf6c651AfF',
                        '0xB9c35756B6068430Ab55C8d9013621B1604b4F3b', 
                        '0x357035fC00E66A047b283433FDc5F2E5173607E8',
                        '0x051679143dC8A82CAeb23FC985Ee21b8d06Aa2D3',
                        '0xeB8E6C387F30E0ab1532d15Da0DF49C1dC273d76', 
                        '0x9538f0F7fA2B315d98BAF0cE3c3935dC10d7F811',
                        '0xcdCb2A1f6725E2a6FFfFA1F4724077aF713d0921', 
                        '0x01aBF7Bb56bCED44fc1246935B5bbA1b293c53a7',
                        '0x0b92552F45eca86cB20C5767F2DC8876a2F16A87', 
                        '0xA5FdE297cD63FD7aBaCfcd4a92D15338f7d73a53',
                        '0xD7145e38e756643fa82C86d936A42f132135BEEf', 
                        '0x638FD8aB0C0B84B11a9a892996B376398C4bf182'                        
    ]
    return address[bookId];
    }



    return (
        <>
            <Button className="button" variant="primary" onClick={handleShow}>
                Add Book
            </Button>
            {/* {props.data.name} */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Book </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <p>This pdf is stored on IPFS & The Ethereum Blockchain!</p>
                                    <form onSubmit={onSubmit} >
                                        <input type='file' onChange={captureFile} /> <br /> <br />
                                        <label>Book Name</label>  <br/>
                                        <input type='text' name="bookName" onChange={captureBookName} placeholder='Book Name' /> <br />  <br />
                                        <label>Author Name</label> <br/>
                                        <input type="text" name="authorName" onChange={captureAuthorName} placeholder='Author Name' /> <br /> <br/>
                                        <input type='submit' />
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button className="button" variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button className="button" variant="primary" onClick={handleYes}>
                        Yes!
            </Button>
                </Modal.Footer> */}
            </Modal>

            <Modal show={secondShow} onHide={handleSecondClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Loading . . . .</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="loader"></div>
                    
                    <p>This flow first generate iphs Hash. It gets save in Smart Contract of User. BookId is save in azure db.

                        <br/>
                    After Book Upload it goes for verification and Author is contacted for confirmation, author's address and book's price. 
                    Random address is getting used for now. 

                    </p>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className="button" variant="secondary" onClick={handleSecondClose}>
                        Cancel
            </Button>
                    <Button className="button" variant="primary" onClick={handleSecondYes}>
                        Yes!
            </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;


