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
            books: [],
          };
    }


  componentDidMount = () => {
    console.log("Invoking Home!");
    this.getDatafromApi()
  };


  getDatafromApi = async () => {
    try {
    
    console.log("get Data from getDataApi");
    let response = await axios.get('http://localhost:4000/api/getChainData');
    this.setState({ books : response.data });
    
    } catch(err) {
      console.log(err);
    };
 }


 render() {
    return (
        <Container >
            <Row className="border border-dark" style={{padding: "20px"}}>
                {
                    this.state.books.map((item, index) => {
                        return <Col key={index}>
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

export default Home;