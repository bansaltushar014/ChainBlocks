
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import './buttonFix.css';
import Modal from './modal';
import web3Obj from './helper'
import api from './randomData.json';
import axios from "axios";

class Homepage extends React.Component {
    constructor() {
        super()
        // this.secondaryFun = this.secondaryFun.bind(this);
        console.log(api);

    }

    componentDidMount() {
        this.UserList();

    }

    UserList() {
        axios.get("http://localhost:4000/").then(res => {
            console.log(res.data);
        });
    }

    library() {
        console.log('secondaryFun funn')
        alert("lub");
    }

    showAlert() {



    }

    getUserInfo = async () => {
        const userInfo = await web3Obj.torus.getUserInfo()
        console.log(userInfo);
        return (
            alert(JSON.stringify(userInfo))
        )
    }

    logout = () => {
        web3Obj.torus.cleanUp().then(() => {
            this.setState({ account: '', balance: 0 })
            sessionStorage.setItem('pageUsingTorus', false)
        })
    }



    render() {


        return (
            <div>
                <Container >
                    <Row className="border border-dark">
                        <Col><Button onClick={this.getUserInfo} variant="info" className="button align-top">Info</Button>{' '}</Col>
                        <Col xs={6}><Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button className="button" variant="outline-success">Search</Button>
                        </Form></Col>
                        <Col><Button onClick={this.library} className="button" variant="success">Library</Button>{''}</Col>
                        <Col><Button onClick={this.logout} className="button" variant="info">Logout</Button>{' '}</Col>
                    </Row>
                </Container>
                {/* <button onClick={this.UserList}>fetch</button> */}

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
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                </Card.Text>
                                            <Button className="button" variant="primary">Buy for {item.price} </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>
                </Container>

                <Modal data={api[0]} />

            </div>
        );
    }
}

export default Homepage;
