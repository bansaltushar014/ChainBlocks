import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const NoMatch = () => {
    
    return (<Container>
        <br/> <br/> <br/> <br/>
        <Row>
          <Col xs={{ span: 4, offset: 5 }}> <b>No Match Found</b> </Col>
        </Row>
      </Container> );
}
 
export default NoMatch;