import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './buttonFix.css';
import Payment from './payment';
import ipfsHelper from './ipfsHelper'
import Chainbooks from './contracts/Chainbooks.json';
import web3Obj from './helper'

function Example() {
    const [show, setShow] = useState(false);
    const [secondShow, setSecondShow] = useState(false);

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

    const [buffer, setBuffer] = useState([]);
    const [chainBookInstance, setChainBookInstance] = useState();
    const [generatedHash, setGeneratedHash] = useState(null);
    const [bookId, setBookId] = useState(0);
   
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
                        setBookId(result[0])
                        showLoading(hash);
                    })
            })
        })
    }

    const showLoading = (hash) => {
        handleYes();
        handleSecondShow();
        console.log("Inside Showloading where hash is " + hash + " book id is "+bookId);

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
                                        <input type='text' placeholder='Book Name' /> <br />
                                        <h3>Author Name</h3> <br />
                                        <input type="text" placeholder='Author Name' /> <br />
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


