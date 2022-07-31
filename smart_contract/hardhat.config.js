// https key (alchemy): https://eth-goerli.g.alchemy.com/v2/Sn92c1bpiRQXqFPKLgsmL-alJqQKnBko

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/Sn92c1bpiRQXqFPKLgsmL-alJqQKnBko',
      accounts: ['48a307e40c5af2946a8c5ee55c6bcea16a27dc5785bae1e69b768c12b1958643']
    }
  }
}