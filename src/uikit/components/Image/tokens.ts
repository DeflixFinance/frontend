import addresses from '../../addresses.json'

/**
 * @see https://github.com/pancakeswap/pancake-frontend/blob/develop/src/config/constants/tokens.ts
 */
const tokens = {
  cake: {
    symbol: 'WAG',
    address: {
      106: addresses[106].WAGToken,
      111: addresses[111].WAGToken,
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },

  wvlx: {
    symbol: 'wVLX',
    address: {
      106: addresses[106].WVLX,
      111: addresses[111].WVLX,
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      106: addresses[106].WAGStake,
      111: addresses[106].WAGStake,
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      106: '0x01445C31581c354b7338AC35693AB2001B50b9aE',
      111: '0x6Ef054B3E3C3C83E14527E8fa593c2c4435A6ea4',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
}

export default tokens
