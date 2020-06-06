import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import api from './randomData2.json';
import Card from 'react-bootstrap/Card';
import Modal from './modal';

function home() {

   
    return (
        <Container >
            <Row className="border border-dark" style={{padding: "20px"}}>
                {
                    api.map((item) => {
                        return <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                     <label>By: <b>{item.By}</b></label> <br/>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
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


export default home;