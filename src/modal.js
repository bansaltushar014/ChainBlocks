import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './buttonFix.css';
import Payment from './payment';

function Example(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
        console.log("It has closed");
    }

    const handleYes = () => {
        setShow(false);
        console.log("yes run");
        Payment.sendEth('0x3ad7074068117c29f43C8F175D5C6f10D4632B73',20);
    } 

    const handleShow = () => setShow(true);


  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
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
            <Button className="button"  variant="primary" onClick={handleYes}>
              Yes!
            </Button>
          </Modal.Footer>
        </Modal>
       
      </>
    );
  }
  
  export default Example;