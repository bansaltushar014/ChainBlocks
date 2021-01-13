
import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InfoModal from './infoModal';
import web3Obj from './helper';
import Home from './home';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import library from './library';
import AddBookModal from './addBookModal';
import './css/buttonFix.css';

class Homepage extends React.Component {
    
    constructor(props) {
        super(props)
                             
        this.state = {
            userInfo : {},
          };
    }

    componentDidMount = () => {
        this.getUserInfo();
    };

    getUserInfo = async () => {
        let fetchUserInfo = {};
        console.log("Inside getInfo!");
        const userInfo = await web3Obj.torus.getUserInfo();
        const accountsInfo = await web3Obj.web3.eth.getAccounts();
        fetchUserInfo.name = userInfo.name;
        fetchUserInfo.email = userInfo.email;
        fetchUserInfo.verifier = userInfo.verifier;
        fetchUserInfo.address = accountsInfo[0];
        this.setState({userInfo:fetchUserInfo});
    }

    logout = () => {
        this.props.logout();
        window.location.reload('/'); 
    }

    render() {
        
        return (
            <>              
                 <Router>
                    <Container style={{padding: "0px 20px"}}>
                        <Row className="border border-dark">
                            
                            <Col>
                                <InfoModal data={this.state.userInfo} />
                            </Col>
                            
                            <Col>
                                <AddBookModal />
                            </Col>
                                                                                    
                            <Col>
                                <Link to='/'>
                                    <Button onClick={Home} className="button" variant="success">
                                        Home
                                    </Button>
                                </Link>
                            </Col>
                                                        
                            <Col>
                                <Link to='/library'>
                                    <Button onClick={this.library} className="button" variant="success">
                                        Library
                                    </Button>
                                </Link>
                            </Col>
                            
                            <Col>
                                <Button onClick={this.logout} className="button" variant="info">
                                    Logout
                                </Button>
                            </Col>
                        </Row>
                    
                        <Redirect to='/' />

                    </Container>
                    
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/library' component={library} />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default Homepage;
