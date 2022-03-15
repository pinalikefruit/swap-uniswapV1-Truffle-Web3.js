const { legos } = require('@studydefi/money-legos');
const moment = require('moment');

//Kovan WTH token: https://kovan.etherscan.io/address/0xb8c9F0c3bD4CD5f1fB10c6FDA7334ecAC385431f
const WETH_ABI = legos.erc20.abi;
const WETH_ADDRESS = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
const wethContract = new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);

//Kovan Uniswap WETH exchange: 
const EXCHANGE_ABI = legos.uniswap.exchange.abi;
const EXCHANGE_ADDRESS = '0x1D79BcC198281C5F9B52bf24F671437BaDd3a688';
const exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);

//Minimum tokens to swap
const MIN_TOKENS = 1;

//Set deadline 1 minute form now
const now = moment().unix();
const DEADLINE = now + 60;


const SETTINGS = {
    gasLimit: 6000000,
    gasPrice: web3.utils.toWei('8', 'Gwei'),
    from: '[YOUR_PUBLIC_KEY]',
    value: web3.utils.toWei('0.01', 'Ether')
}

module.exports = async function (callback) {
    try {
        let balance;

        balance = await web3.eth.getBalance(SETTINGS.from);
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`The ether balance is ${balance} ETH`);

        balance = await wethContract.methods.balanceOf(SETTINGS.from).call();
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`The wrapped eth balance is ${balance} WETH`);

        console.log('Performing swap . . . .');
        let result;
        result = await exchangeContract.methods.ethToTokenSwapInput(MIN_TOKENS, DEADLINE).send(SETTINGS);
        console.log(`Successful swap: https://kovan.etherscan.io/tx/${result.transactionHash}`);

        balance = await web3.eth.getBalance(SETTINGS.from);
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`The ether balance is ${balance} ETH`);

        balance = await wethContract.methods.balanceOf(SETTINGS.from).call();
        balance = web3.utils.fromWei(balance, 'Ether');
        console.log(`The wrapped eth balance is ${balance} WETH`);
    }
    catch (error) {
        console.log(error);
    }
    callback();
}
