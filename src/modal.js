import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './css/buttonFix.css';
import Payment from './payment';
import './css/loader.css';

function Example(props) {
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    console.log("It has closed");
  }

  const handleYes = () => {
    setShow(false);
    console.log("Inside HandleYes!");
    const bookId = props.data.bookId;
    const price = props.data.price;
    // send the ether to owner 
    Payment.getAuthorAddress(bookId, price)
    handleSecondShow();
    handleSecondClose();
}

  const handleShow = () => setShow(true);

  const handleSecondClose = () => {
    setTimeout(() => {
      setSecondShow(false);
    }, 20000);
    
  }

  const handleSecondShow = () => {
    setSecondShow(true);
  }



  return (
    <>
      <Button className="button" variant="primary" onClick={handleShow}>
        Buy for {props.data.price}
      </Button>
      {/* {props.data.name} */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm for the Book "{props.data.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>Yes, I want to buy this book written by "{props.data.By}" for {props.data.price} &#x20B9;</Modal.Body>
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
          <Modal.Title>Loading . . . .</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="loader"></div>

          <p>Executes two transaction, Sending the amount to Author and saving the IPFS hash in User's SmartContract.</p>
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