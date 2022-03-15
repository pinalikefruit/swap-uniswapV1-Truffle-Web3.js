const { legos } = require('@studydefi/money-legos');
const moment = require('moment');

//Kovan DAI token: https://kovan.etherscan.io/address/0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
const DAI_ABI = legos.erc20.dai.abi;
const DAI_ADDRESS = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
const daiContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);

//Kovan Uniswap Factory:https://kovan.etherscan.io/address/0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30#code

//Kovan Uniswap Dai Exchange: https://kovan.etherscan.io/address/0x613639E23E91fd54d50eAfd6925AF2Ed6701A46b
const EXCHANGE_ABI = legos.uniswap.exchange.abi;
const EXCHANGE_ADDRESS = '0x613639E23E91fd54d50eAfd6925AF2Ed6701A46b';
const exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);

//Minimum tokens to swap
const MIN_TOKENS = 1;

//Set Deadline 1 minute from now
const now = moment().unix();
const DEADLINE = now + 60 // add 60 seconds

const SETTINGS = {
    gasLimit: 6000000,
    gasPrice: web3.utils.toWei('8', 'Gwei'),
    from: '[YOUR_PUBLIC_KEY]',
    value: web3.utils.toWei('0.001', 'Ether')
}

module.exports = async function (callback) {
    try {
        let balance;

        //Check ether balance BEFORE swap
        balance = await web3.eth.getBalance(SETTINGS.from);
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`Ether balance is: ${balance} ETH`);

        //Check DAI balance BEFORE  swap 
        balance = await daiContract.methods.balanceOf(SETTINGS.from).call();
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`Dai Balance is: ${balance} DAI`);

        //Perform Swap
        console.log('Performing swap . . . .');
        let result;
        result = await exchangeContract.methods.ethToTokenSwapInput(MIN_TOKENS, DEADLINE).send(SETTINGS);

        console.log(`Successful swap: https://kovan.etherscan.io/tx/${result.transactionHash}`);

        //Check ether balance AFTER swap 
        balance = await web3.eth.getBalance(SETTINGS.from);
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`New Ether Balance is: ${balance} ETH`);

        //Check DAI balance AFTER swap
        balance = await daiContract.methods.balanceOf(SETTINGS.from).call();
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`New Dai balance is: ${balance} DAI`);
    }
    catch (error) {
        console.log(error);
    }

    callback();
}