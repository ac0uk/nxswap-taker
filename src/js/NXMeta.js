const NXMeta = {
  currencies: {
    TBTC: {
      name: 'Bitcoin (Testnet)',
      icon: '/img/currencies/btc.svg',
      testnet: true,
      variableFee: true
    },
    TLTC: {
      name: 'Litecoin (Testnet)',
      icon: '/img/currencies/ltc.svg',
      testnet: true,
      variableFee: false
    },
    TVTC: {
      name: 'Vertcoin (Testnet)',
      icon: '/img/currencies/vtc.svg',
      testnet: true,
      variableFee: false
    }
  }
}

module.exports = NXMeta;