import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './css/buttonFix.css';

function InfoModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    
    const handleYes = () => {
        setShow(false);
    } 

    const handleShow = () => {
        setShow(true)
    };

    return (
      <>
        <Button className="button" variant="info"  onClick={handleShow}>
          Info
        </Button>
        {props.data.name &&
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {props.data.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body> 

                Email : {props.data.email}  <br/>
                Varifier : {props.data.verifier} <br/>
                Address : {props.data.address} <br/>

          </Modal.Body>
          <Modal.Footer>
            <Button className="button"  variant="primary" onClick={handleYes}>
              OK!
            </Button>
          </Modal.Footer>
        </Modal>
        }
        </>
    );
  }
  
  export default InfoModal;