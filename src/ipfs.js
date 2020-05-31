import React, { Component } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import User from './contracts/User.json';
import getWeb3 from './utils/getWeb3';
import ipfsHelper from './ipfsHelper';
import web3Obj from './helper';


// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
import './ipfs.css';

class Ipfs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
    };
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.UsergetContract = this.UsergetContract.bind(this);
    this.UserContract = this.UserContract.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info

    getWeb3
    .then(results => {
      this.setState({
        web3: web3Obj.web3
        })

      // Instantiate contract once web3 provided.
      // this.instantiateContract()
       this.Initialize();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  // this function is just to check the functionality 
  getUserInfo = async () => {
    const userInfo = await web3Obj.torus.getUserInfo()

    console.log(userInfo);
  }


  // testing the deployed user smart contract
  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    // console.log("web version "+ this.state.web3.version);
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance
        this.setState({ account: accounts[0] })
        // Get the value from the contract to prove it worked.
        return this.simpleStorageInstance.get.call(accounts[0])
      }).then((ipfsHash) => {
        // Update state with the result.
        return this.setState({ ipfsHash })
      })
    })
  }

  Initialize(){
    const abi = User.abi;
    const contractAddress = User.networks[3].address; 
    this.userInstance = new this.state.web3.eth.Contract(abi,contractAddress);
    this.UserContract();
  }

  UserContract() {
    this.state.web3.eth.getAccounts().then((e)=>{
      console.log("e0 is "+ e[0]);
      this.userInstance.methods.set('testString3').send({from: e[0]}).then((r)=> {
        console.log(r);      
      })
    })
  }

  UsergetContract(){
    console.log("Getting called");
    this.userInstance.methods.get().call({from: '0xa02cd3afb5ba86996797aeda780b6bf46fccd43a'}).then((ipfsHash) => {
      // Update state with the result.
      console.log("inside 2");
     console.log(ipfsHash);
    })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event) {
    event.preventDefault()
    ipfsHelper.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        console.log('ifpsHash', result[0].hash);
        return  this.setState({ ipfsHash: result[0].hash })
        
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">IPFS File Upload DApp</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload Image</h2>
              <button onClick={this.UsergetContract}>Check</button>
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile} />
                <input type="submit" />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Ipfs;
