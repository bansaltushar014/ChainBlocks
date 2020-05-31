
import React from 'react';
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
            })
        })
}

function library() {
    userInitialization();
    return (
        <Container >
            <Row className="border border-dark">
                {
                    api.map((item) => {
                        return <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.By}</Card.Title>
                                    <Card.Text>
                                        library quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                            </Card.Text>
                                    {/*  <Button className="button" variant="primary">Buy for {item.price} </Button> */}
                                    <Modal data={item} />
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default library;