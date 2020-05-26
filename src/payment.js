import React, { Component } from 'react'
import web3Obj from './helper'
import Modal from './modal'

class Payment extends Component {
    constructor(props) {
        super(props)
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount(){
        this.getUserInfo();
    }


    getUserInfo = async () => {
        const userInfo = await web3Obj.torus.getUserInfo()
        console.log(userInfo);
    }

    sendEth = async (toaccount,value) => {
        
        var receipt = await web3Obj.web3.eth.sendTransaction({ from: '0xa02cD3AFB5BA86996797AeDa780B6bF46fcCD43A', to: toaccount, value: web3Obj.web3.utils.toWei('0.01') })
        alert(JSON.stringify(receipt));
      }

    
    getStatus = async () => {
        console.log("insisde getStatus");
        var receipt = await web3Obj.web3.eth.getTransactionReceipt('0x24b0829cf1bc2724d85af24fe3d4da9be5b97021e340385de9aa80a046659a08');
        alert(JSON.stringify(receipt));

    }
   

    render() {
        return (
            <Modal func ={this.getUserInfo } />
        )
    }
   
}
const payment= new Payment();
export default payment;