
import React, { useState, useEffect } from "react";
import api from './randomData.json';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from './modal';
import Card from 'react-bootstrap/Card';
import './buttonFix.css';
import User from './contracts/User.json';
import web3Obj from './helper'




const Library = () => {
  const [ipfs, setipfs] = useState([]);
//   const [planets, setPlanets] = useState({});

  useEffect(() => {
    userInitialization();
  },[]);

  async function userInitialization() {
    console.log("Inside userInitialization!");
    const userAbi = User.abi;
    const userContractAddress = User.networks[3].address;
    const userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
    await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
        await userInstance.methods.get().call({ from: accounts[0] })
            .then((result) => {
                console.log("IPFS has been received from User!");
                console.log(result);
                setipfs(result);
            })
        })
}

    // userInitialization();
    return (
        <Container >
            
            <Row className="border border-dark">
                {
                    ipfs.map((item) => {
                        return <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="http://placekitten.com/g/320/500" />
                                <Card.Body>
                                    
                    <Card.Title>klkl </Card.Title>
                                    <Card.Text>
                                        library quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                            </Card.Text>
                                    {/*  <Button className="button" variant="primary">Buy for {item.price} </Button> */}
                                    <button>Read</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default Library;