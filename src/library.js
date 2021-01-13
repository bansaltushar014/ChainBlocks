import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './css/buttonFix.css';
import web3Obj from './helper'
import { userInitialization } from './instance.js';


const Library = () => {
    const [ipfs, setipfs] = useState([]);
    
    useEffect(() => {
        getChainData();
    }, []);

    async function getChainData() {
        try {
            const userInstance = await userInitialization();
            console.log(userInstance);
            const getAccounts = await web3Obj.web3.eth.getAccounts();
            const getHash = await userInstance.methods.get().call({ from: getAccounts[0] });
            setipfs(getHash);
        }
        catch (error) {
            console.log(error);
        };
    }

    function Read(item) {
        console.log("Read book executing!" + item);
        var url = "http://localhost:3000/pdf?hash=" + item;
        window.open(url, "_blank")
        //    window.location.href = url;
    }

    return (
        <Container >
            <Row className="border border-dark" style={{ padding: "20px" }}>
                {
                    ipfs.map((item, index) => {
                        return <Col key={index}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src="http://placekitten.com/g/320/500" />
                                <Card.Body>
                                    <Card.Title> Book Name {index} </Card.Title>
                                    <Card.Text>
                                        library quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <button onClick={() => Read(item)}> Read</button>
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