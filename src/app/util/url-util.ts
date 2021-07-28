export default {
  constructCoinDataUrl: (symbol: string) => {
    return `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`;
  },
};
