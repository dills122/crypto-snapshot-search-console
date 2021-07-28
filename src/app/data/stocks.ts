export interface Coin {
  name: string;
  symbol: string;
  link?: string;
}

const coins: Coin[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    link: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    link: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    link: 'https://api.coinbase.com/v2/exchange-rates?currency=LINK',
  },
];

export default coins;
