import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './buttonFix.css';



function ReadBook(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
        console.log("It has closed");
    }

    const handleYes = () => {
        setShow(false);
    } 

    const handleShow = () => setShow(true);


  
    return (
      <>
        <Button className="button" variant="primary" onClick={handleShow}>
        Read
        </Button>
        {/* {props.data.name} */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Read Book</Modal.Title>
          </Modal.Header>
    <Modal.Body>Click Yes to Open the Book {props.data} </Modal.Body>
          <Modal.Footer>
            <Button className="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="button"  variant="primary" onClick={handleYes}>
            <a target="_blank" href="http://localhost:3000/pdf?hash=QmaTyn7RxTjo2Z7Kf6CCnHE4MZKndfvZ8vu1qCG3t7roNK">Open</a>
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    );
  }
  
  export default ReadBook;