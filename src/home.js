import React from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import BuyBookModal from './buyBookModal';


class Home extends React.Component {



    constructor(props) {
        super(props)
        this.getDatafromApi = this.getDatafromApi.bind(this);
        this.state = {
            api: [],
          };
    }


  componentDidMount = () => {
    this.getDatafromApi()
  };


  getDatafromApi = () => {

    console.log("get Data from getDataApi");
    let that = this;      
    axios.get('http://localhost:4000/api/getChainData')
    .then(function (response) {
      console.log(response.data);

      that.setState({ api : response.data });

    })
    .catch(function (error) {
      console.log(error);
    });
 }


 render() {
    return (
        <Container >
            
            <Row className="border border-dark" style={{padding: "20px"}}>
                {
                    this.state.api.map((item) => {
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
                                    <BuyBookModal data={item} />
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Container>
        
    )
}
}

var homeObject = new Home();
export {Home, homeObject};