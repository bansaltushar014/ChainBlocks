import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './buttonFix.css';
import Payment from './payment';
import ipfsHelper from './ipfsHelper'
import Chainbooks from './contracts/Chainbooks.json';
import web3Obj from './helper'
import axios from "axios";

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

    const handleSecondYes = () => {
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
    const [generatedHash, setGeneratedHash] = useState(null);

   
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
          })
          .catch(function (error) {
            console.log(error);
          });
      
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
                        '0xA4f118d862eEaAb38be47F4b961aF7138273c1b9',
                        '0xCd185F59d31EBDfa54bb1CCB37e9E8c416b9b8Ed', 
                        '0x2d4F4d1544CF0cbe6EA3DE7446820eB25Ba13dcd',
                        '0x6f8D13FDfebad88198E7D713Ad61da46240c5fdD', 
                        '0xF500D6B52D0044B4C037AB4242d469295E59676b',
                        '0x8F9018BF4155BDFC7558fa9315FE207832a2C2eC', 
                        '0xBa617e7E842Fc5364c4999D9696b0A674695ccD1',
                        '0x7eD7c12d0bd6a8EB3ca72E570Febb9507482641d', 
                        '0xcC98A3ab1DE0B9bA6cE21E6ba5e8de352bAF85A8',
                        '0xEaAb38bA4f118d862ee47F4b961aF7138273c1b9',
                        '0xd31ECd185F59BDfa54bb1CCB37e9E8c416b9b8Ed', 
                        '0x4CF0cbe62d4F4d154EA3DE7446820eB25Ba13dcd',
                        '0xfebad8816f8D13FD98E7D713Ad61da46240c5fdD', 
                        '0xF44B4500D6B52D00C037AB4242d469295E59676b',
                        '0x155BDFC8F9018BF47558fa9315FE207832a2C2eC', 
                        '0xFc5364Ba617e7E842c4999D9696b0A674695ccD1',
                        '0xbd6a8EB37eD7c12d0ca72E570Febb9507482641d', 
                        '0x9bA6cE21cC98A3ab1DE0BE6ba5e8de352bAF85A8'                        
    ]
    return address[bookId];
    }



    return (
        <>
            <Button className="button" variant="primary" onClick={handleShow}>
                Buy for
            </Button>
            {/* {props.data.name} */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm for the Book </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <h1>Your Image</h1>
                                    <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
                                    <form onSubmit={onSubmit} >
                                        <input type='file' onChange={captureFile} /> <br />
                                        <h3>Book Name</h3>  <br />
                                        <input type='text' name="bookName" onChange={captureBookName} placeholder='Book Name' /> <br />
                                        <h3>Author Name</h3> <br />
                                        <input type="text" name="authorName" onChange={captureAuthorName} placeholder='Author Name' /> <br />
                                        <input type='submit' />
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button" variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button className="button" variant="primary" onClick={handleYes}>
                        Yes!
            </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={secondShow} onHide={handleSecondClose}>
                <Modal.Header closeButton>
                    <Modal.Title>second </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    second
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button" variant="secondary" onClick={handleSecondClose}>
                        Cancel
            </Button>
                    <Button className="button" variant="primary" onClick={handleSecondYes}>
                        Yes!
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;


