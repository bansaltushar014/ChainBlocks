
import React, { useState, useEffect } from "react";
import api from './randomData.json';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from './modal';
import Card from 'react-bootstrap/Card';
import './css/buttonFix.css';
import User from './contracts/User.json';
import web3Obj from './helper'
import ReadBookModal from './readBookModal';




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
        <Container style={{padding: "20px"}}>
            
            <Row className="border border-dark" style={{ padding: "20px"}}>
                {
                    ipfs.map((item, index) => {
                        return <Col>
                            <Card style={{ width: '18rem' }} margin='10px'>
                                <Card.Img variant="top" src="http://placekitten.com/g/320/500" style={{ padding: "20px"}}/>
                                <Card.Body>
                                    
                                  <Card.Title> Book Name {index} </Card.Title>
                                    <Card.Text>
                                        library quick example text to build on the card title and make up the bulk of
                                        the card's content. {item}
                                            </Card.Text>
                                    {/*  <Button className="button" variant="primary">Buy for {item.price} </Button> */}
                                    <ReadBookModal data={item} /> 
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