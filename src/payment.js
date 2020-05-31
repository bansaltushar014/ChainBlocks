import React, { Component } from 'react'
import web3Obj from './helper'
import Modal from './modal'
import getWeb3 from './utils/getWeb3'
import User from './contracts/User.json';
import Chainbooks from './contracts/Chainbooks.json';


class Payment extends Component {
    constructor(props) {
        super(props)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.makePayment = this.makePayment.bind(this)
        this.chainBooksInitialization = this.chainBooksInitialization.bind(this)
        this.shareIpfs = this.shareIpfs.bind(this)
        this.userInitialization = this.userInitialization.bind(this);
    }



    componentWillMount() {
        console.log("Inside componentWillMount!");
        getWeb3.then(results => {
            this.setState({ web3: web3Obj.web3 })
            // Instantiate contract once web3 provided.
            this.Initialize();
            this.getUserInfo();
        })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    // I think, Not getting used
    Initialize() {
        console.log("Inside Initialize");
        const userAbi = User.abi;
        const userContractAddress = User.networks[3].address;
        this.userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);

        const chainBooksAbi = Chainbooks.abi;
        const chainBooksContractAddress = Chainbooks.networks[3].address;
        this.chainBookInstance = new this.state.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress);

    }

    // user smart contract initialized here
    userInitialization() {
        const userAbi = User.abi;
        const userContractAddress = User.networks[3].address;
        this.userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
    }

    // chainBook smart contract initialized here
    chainBooksInitialization() {
        const chainBooksAbi = Chainbooks.abi;
        const chainBooksContractAddress = Chainbooks.networks[3].address;
        this.chainBookInstance = new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress);
    }

    // On click buy book, bookid and price is passed to get Author's address 
    getAuthorAddress = async (bookid, price) => {
        this.chainBooksInitialization();
        console.log("Inside getAuthorAddress with id " + bookid);
        await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
            await this.chainBookInstance.methods.getAuthor(bookid).call({ from: accounts[0] })
                .then((result) => {
                    console.log("Author's address has been received!");
                    console.log(result);
                    this.makePayment(price, result);
                })
        })
    }

    // Money is sent to Author's address
    makePayment = async (price, address) => {
        var eth = (price * 0.000061).toFixed(4);
        console.log("Inside makePayment with Eth " + eth);
        await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
            await web3Obj.web3.eth.sendTransaction({ from: accounts[0], to: address, value: web3Obj.web3.utils.toWei(eth) })
                .then((result) => {
                    console.log(JSON.stringify(result));
                    this.shareIpfs(address);
                })
        })
    }

    // After the success of money transaction, Ipfs is called from the chainbook smart contract
    shareIpfs = async (address) => {
        console.log("Inside shareIpfs!");
        await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
        await this.chainBookInstance.methods.getIpfs(address).call({ from: accounts[0] })
            .then((result) => {
                console.log("IPFS has been received!");
                console.log(result);
                //    this.makePayment(price, result);
                this.saveIpfsToUser(result[0]);
            })
        })
    }

    // Ipfs is stored in the User's smart contract
    saveIpfsToUser = async (ipfs) => {
        this.userInitialization();
        console.log("Inside saveIpfsToUser!");
        await web3Obj.web3.eth.getAccounts().then(async (accounts) => {
        await this.userInstance.methods.set(ipfs).send({ from: accounts[0] })
            .then((result) => {
                alert("Book is saved in Library!");
                console.log("IPFS has been saved!");
                console.log(result);
            })
        })
    }


    // I think, Not getting used
    getUserInfo = async () => {
        const userInfo = await web3Obj.torus.getUserInfo()
        console.log(userInfo);
    }

    // I think, Not getting used
    sendEth = async (toaccount, value) => {

        var receipt = await web3Obj.web3.eth.sendTransaction({ from: '0xa02cD3AFB5BA86996797AeDa780B6bF46fcCD43A', to: toaccount, value: web3Obj.web3.utils.toWei('0.01') })
        alert(JSON.stringify(receipt));
    }

    // I think, Not getting used
    getStatus = async () => {
        console.log("insisde getStatus");
        var receipt = await web3Obj.web3.eth.getTransactionReceipt('0x24b0829cf1bc2724d85af24fe3d4da9be5b97021e340385de9aa80a046659a08');
        alert(JSON.stringify(receipt));

    }


    render() {
        return (
            <div></div>
        )
    }

}
const payment = new Payment();
export default payment;