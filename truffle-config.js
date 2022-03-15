const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY || "";
module.exports = {

  networks: {
    kovan: {
      provider: () => new HDWalletProvider(privateKey, `https://kovan.infura.io/v3/${process.env.PROVIDER}`),
      network_id: 42,
      gas: 5500000,
      gasPrice: 25000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
