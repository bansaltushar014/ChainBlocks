import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './css/buttonFix.css';
import ipfsHelper from './ipfsHelper'
// import Chainbooks from './contracts/Chainbooks.json';
import web3Obj from './helper'
import axios from "axios";
import { Home, homeObject } from "./home";
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
        var that = this;
        axios.get('http://localhost:4000/static/Chainbooks.json')
            .then(function (response) {
                console.log(response.data);
                const chainBooksAbi = response.data.abi;
                const chainBooksContractAddress = response.data.networks[3].address;
                setChainBookInstance(new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress))

            })
            .catch(function (error) {
                console.log(error);
            });
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
            console.log("hash is " + result[0].hash);
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
        console.log("Inside Showloading where hash is " + hash + " book id is " + bookId);
        savetoChainBook(hash, bookId);

    }

    const savetoChainBook = async (hash, bookId) => {
        // here azure will save this info and in chainbook we will send ipfs and address
        const authorAddress = randomAddress(bookId);
        console.log("author Address is " + authorAddress);

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
                handleSecondClose();
                refreshPage();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function refreshPage() {
        window.location.reload('http://localhost:3000/');
    }

    const randomAddress = (bookId) => {
        var account = web3Obj.web3.eth.accounts.create();
        return account.address;
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
                                        <label>Book Name</label>  <br />
                                        <input type='text' name="bookName" onChange={captureBookName} placeholder='Book Name' /> <br />  <br />
                                        <label>Author Name</label> <br />
                                        <input type="text" name="authorName" onChange={captureAuthorName} placeholder='Author Name' /> <br /> <br />
                                        <input type='submit' />
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={secondShow} onHide={handleSecondClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Loading . . . .</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="loader"></div>

                    <p>This flow first generate iphs Hash. It gets save in Smart Contract of User. BookId is save in azure db.

                        <br />
                    After Book Upload it goes for verification and Author is contacted for confirmation, author's address and book's price.
                    Random address is getting used for now.

                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;


