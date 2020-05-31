
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import './css/buttonFix.css';
import Modal from './modal';
import InfoModal from './infoModal';
import web3Obj from './helper'
import api from './randomData2.json';
import home from './home';
import {logout1} from './App';
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import library from './library';
import AddBookModal from './addBookModal';

class Homepage extends React.Component {
    

    constructor(props) {
        super(props)
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getChainBookDataAzure = this.getChainBookDataAzure.bind(this);
        console.log(api);
        
        this.state = {
            chainBookDataAzure: [],
          };
    }

    componentDidMount() {
         this.getChainBookDataAzure();
    }


    getChainBookDataAzure() {
        let currentComponent = this;
        axios.get('http://localhost:4000/api/getChainData')
          .then(function (response) {
            console.log(response.data);
            // currentComponent.setData();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

   

    getUserInfo = async () => {
        this.data = {};
        console.log("Inside getInfo!");
        await web3Obj.torus.getUserInfo()
            .then(async (r) => {
                console.log("Inside Success of getInfo!");
                this.data.name = r.name;
                this.data.email = r.email;
                this.data.verifier = r.verifier;
                await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
                    this.data.address = accounts[0];
                })
                console.log(this.data);
            })
    }

    logout = () => {
        // web3Obj.torus.cleanUp().then(() => {
        //     this.setState({ account: '', balance: 0 })
        //     sessionStorage.setItem('pageUsingTorus', false)
        // })
        logout1.logout();
        window.location.reload('http://localhost:3000/'); 
    }

    render() {
        this.getUserInfo();
        return (
            <div>
                { this.state && this.state.chainBookDataAzure &&
 
                <Router>
                    <Container style={{padding: "0px 20px"}}>

                        <Row className="border border-dark" >
                            {/* <Col><Button onClick={this.getUserInfo} variant="info" className="button align-top">Info</Button>{' '}</Col> */}
                            <Col><InfoModal data={this.data} /></Col>
                            <Col>
                            {/* <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button className="button" variant="outline-success">Search</Button>
                            </Form> */}
                            {/* <Button onClick={''} className="button" variant="info">Add Book</Button> */}
                            <AddBookModal />
                            </Col>
                            <Redirect to='/' />
                            <Link to='/'><Col><Button onClick={home} className="button">Home</Button>{''}</Col></Link>
                            <Link to='/library'><Col><Button onClick={this.library} className="button">Library</Button>{''}</Col></Link>
                            <Col><Button onClick={this.logout} className="button" variant="info">Logout</Button>{' '}</Col>
                        </Row>

                    </Container>
                    {/* <button onClick={this.UserList}>fetch</button> */}

                    <Switch>
                        <Route exact path='/' component={home} />
                        <Route path='/library' component={library} />
                    </Switch>
                </Router>
                }
            </div>
        );
    }
}

export default Homepage;
