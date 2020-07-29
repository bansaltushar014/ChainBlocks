// import React, { Component } from "react";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Card from 'react-bootstrap/Card';
// import './css/buttonFix.css';
// import User from './contracts/User.json';
// import web3Obj from './helper'
// import axios from "axios";


// class Library extends Component {

//     constructor(props) {
//         super(props)
//          this.state = {
//             ipfs: [],
//             userInstance: ''
//          }
//         this.Read = this.Read.bind(this)
//         this.userInitialization = this.userInitialization.bind(this);
//         this.Random = this.Random.bind(this);
//     }
    
    

//     componentDidMount = () => {
//         this.userInitialization();
//     };

    

//     userInitialization = () => {
        
//         const that1 = this;
//         axios.get('http://localhost:4000/static/Chainbooks.json')
//             .then( async function (response) {
//                 console.log(response.data);
//                 const userAbi = User.abi;
//                 const userContractAddress = User.networks[3].address;
//                 that1.state.userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
//                 that1.Random();
               
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });

//         // const userAbi = User.abi;
//         // const userContractAddress = User.networks[3].address;
//         // const userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
       
//     }

//     Random = async () => {
//         var that = this;
//         await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
//             await userInstance.methods.get().call({ from: accounts[0] })
//                 .then((result) => {
//                     console.log("IPFS has been received from User!");
//                     this.state.ipfs = result;
//                 })
//                 .catch(function (error) {
//                     alert(error);
//                 });            
//         })
//         .catch(function (error) {
//             alert(error);
//         });
//     }

//     Read = (item) => {
//         console.log("Read book executing!" + item);
//         var url = "http://localhost:3000/pdf?hash=" + item;
//         window.open(url, "_blank")
//         //    window.location.href = url;
//     }


//     // userInitialization();
//     render() {
        
//     return (
//         <Container >
//             <Row className="border border-dark" style={{ padding: "20px" }}>
//                 {
//                     this.state.ipfs.map((item, index) => {
//                         return <Col>
//                             <Card style={{ width: '18rem' }} >
//                                 <Card.Img variant="top" src="http://placekitten.com/g/320/500" />
//                                 <Card.Body>

//                                     <Card.Title> Book Name {index} </Card.Title>
//                                     <Card.Text>
//                                         library quick example text to build on the card title and make up the bulk of
//                                         the card's content.
//                                             </Card.Text>
//                                     <button onClick={() => this.Read(item)}> Read</button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     })
//                 }
//             </Row>
//         </Container>
//     )}
// }

// export default Library;


import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './css/buttonFix.css';
import User from './contracts/User.json';
import web3Obj from './helper'
import axios from "axios";
// import { getChainData } from "../fetch";

const Library = () => {
  const [ipfs, setipfs] = useState([]);
  const [user, setuser] = useState();

  useEffect(() => {
    getChainData();
  },[]);

  function getChainData(){
    axios.get('http://localhost:4000/static/User.json')
                .then( async function (response) {
                    console.log(response.data);
                    setuser(response.data);
                    userInitialization();
                })
                .catch(function (error) {
                    console.log(error);
                });
  }

  async function userInitialization() {
    console.log("Inside userInitialization!");
    console.log(user);
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

    function Read(item){
        console.log("Read book executing!" + item);
        var url = "http://localhost:3000/pdf?hash="+item;
        window.open(url, "_blank")
    //    window.location.href = url;
    }



    // userInitialization();
    return (
        <Container >
            
            <Row className="border border-dark" style={{padding: "20px"}}>
                {
                    ipfs.map((item, index) => {
                        return <Col>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src="http://placekitten.com/g/320/500"/>
                                <Card.Body>
                                    
                    <Card.Title> Book Name {index} </Card.Title>
                                    <Card.Text>
                                        library quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                            </Card.Text>
                                    {/*  <Button className="button" variant="primary">Buy for {item.price} </Button> */}
                                    {/* <ReadBookModal data={item} />  */}
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