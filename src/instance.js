import axios from "axios";
import web3Obj from './helper'

export function chainBooksInitialization() {
    return new Promise(async function(resolve, reject){
        try{
            let response = await axios.get('http://localhost:4000/static/Chainbooks.json')
            const chainBooksAbi = response.data.abi;
            const chainBooksContractAddress = response.data.networks[3].address;
            const chainBookInstance = new web3Obj.web3.eth.Contract(chainBooksAbi, chainBooksContractAddress);
            if(chainBookInstance)
                resolve(chainBookInstance)
    }
    catch(error) {
        console.log(error);
        reject(error);
    }
})    
}

export function userInitialization() {
    return new Promise(async function(resolve, reject){
        try{
            const response = await axios.get('http://localhost:4000/static/User.json');
            const userAbi = response.data.abi;
            const userContractAddress = response.data.networks[3].address;
            const userInstance = new web3Obj.web3.eth.Contract(userAbi, userContractAddress);
            if(userInstance)
                resolve(userInstance);
        }catch (error) {
            console.log(error);
            reject(error);
        };    
    });
}

