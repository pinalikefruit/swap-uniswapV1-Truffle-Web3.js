### Swap with Uniswap v1, web3.js, truffle.

In this repo, you can interact with the uniswap protocol v1.
I'm show two examples  but the unique changes is the address of token and the address of exchange of the respective token. Can you find the last one in [Uniswap v1 factory ](https://kovan.etherscan.io/address/0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30#readContract
 using the getExchange() function, enter the contract address of token.

#### Prerequsites
Please install or have installed the following:
* nodejs (v16.13.2) and npm (8.1.2).

#### Installation

1. Clone this repo
`git clone https://github.com/pinajmr/swap-uniswapV1.git Swap-with-UniswapV1`
2. Then, 
`cd Swap-with-UniswapV1`.
3. Install dependencies using 
`npm install`.
4. update .env_example file for .env and change the information.
5. Update Public_Key in script files.

#### Usage
##### Running Scripts
`truffle exec scripts/swap-eth-dai.js --network kovan  `
o 
`truffle exec scripts/swap-eth-weth.js --network kovan  `

#### Help
You can contact to me in discord like pinajmr#4347 glad to help you.