import web3Obj from './helper'
import { chainBooksInitialization, userInitialization } from './instance.js';

// On click buy book, bookid and price is passed to get Author's address 
export function getAuthorAddress(bookid, price) {

    console.log("Inside getAuthorAddress with id " + bookid);

    return new Promise(async function (resolve, reject) {
        try {
            const accounts = await web3Obj.web3.eth.getAccounts();
            const chainBooksInitializationget = await chainBooksInitialization();
            const address = await chainBooksInitializationget.methods.getAuthor(bookid).call({ from: accounts[0] })
            console.log("Author's address has been received!");
            var eth = (price * 0.000061).toFixed(4);
            const result = await web3Obj.web3.eth.sendTransaction({
                 from: accounts[0],
                 to: address,
                 value: web3Obj.web3.utils.toWei(eth)
            })
            console.log(JSON.stringify(result));
            const hash = await chainBooksInitializationget.methods.getIpfs(address).call({ from: accounts[0] })

            console.log("IPFS has been received!");

            const userInstanceget = await userInitialization();
            await userInstanceget.methods.set(hash[0]).send({ from: accounts[0] })
                .then((result) => {
                    console.log("IPFS has been saved!");
                    resolve(true);
                })
                .catch(e => {
                    alert("this");
                    reject(e);
                })
        } catch (err) {
            console.log(err);
        }
    })
}