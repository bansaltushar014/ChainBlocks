import React, { Component } from 'react'
import web3Obj from './helper'
import getWeb3 from './utils/getWeb3'
import User from './contracts/User.json';
import axios from "axios";
// import Chainbooks from './contracts/Chainbooks.json';


class Payment extends Component {
    constructor(props) {
        super(props)
        this.chainBooksInitialization = this.chainBooksInitialization.bind(this)
        this.userInitialization = this.userInitialization.bind(this);
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({ web3: web3Obj.web3 })
        })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    userInitialization() {

        // problem , if i uncomment 35 36 37 and comment 44 45 46 then problem comes, wht?

        // this.userInstance = '';
        // var that = this;
        axios.get('http://localhost:4000/static/User.json')
            .then(function (response) {
                console.log(response.data);

                // const userAbi = response.data.abi;
                // const userContractAddress = response.data.networks[3].address;
                // that.userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(User);
        const userAbi = User.abi;
        const userContractAddress = User.networks[3].address;
        this.userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
    }

    // chainBook smart contract initialized here
    chainBooksInitialization() {

        this.chainBookInstance = '';
        var that = this;
        axios.get('http://localhost:4000/static/Chainbooks.json')
            .then(function (response) {
                console.log(response.data);
                const chainBooksAbi = response.data.abi;
                const chainBooksContractAddress = response.data.networks[3].address;
                that.chainBookInstance = new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress);

            })
            .catch(function (error) {
                console.log(error);
            });

        // const chainBooksAbi = Chainbooks.abi;
        // const chainBooksContractAddress = Chainbooks.networks[3].address;
        // this.chainBookInstance = new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress);
    }

    // On click buy book, bookid and price is passed to get Author's address 
    getAuthorAddress = (bookid, price) => {
        this.chainBooksInitialization();
        console.log("Inside getAuthorAddress with id " + bookid);
        var that = this;
        var address;
        return new Promise(function (resolve, reject) {
            web3Obj.web3.eth.getAccounts().then(async (accounts) => {
                await that.chainBookInstance.methods.getAuthor(bookid).call({ from: accounts[0] })
                    .then(async (result) => {
                        console.log("Author's address has been received!");
                        address = result;
                        var eth = (price * 0.000061).toFixed(4);
                        await web3Obj.web3.eth.sendTransaction({ from: accounts[0], to: address, value: web3Obj.web3.utils.toWei(eth) })
                            .then(async (result) => {
                                console.log(JSON.stringify(result));
                                await that.chainBookInstance.methods.getIpfs(address).call({ from: accounts[0] })
                                    .then(async (result) => {
                                        console.log("IPFS has been received!");
                                        var that1 = that;
                                        that.userInitialization();
                                        await that1.userInstance.methods.set(result[0]).send({ from: accounts[0] })
                                            .then((result) => {
                                                console.log("IPFS has been saved!");
                                                resolve(true);
                                            })
                                            .catch(e => {
                                                alert("this");
                                                reject(e);
                                            })
                                    })
                                    .catch(e => {
                                        reject(e);
                                    })
                            })
                            .catch(e => {
                                reject(e);
                            })
                    })
                    .catch(e => {
                        reject(e);
                    })
            })
        })
    }


}
const payment = new Payment();
export default payment;