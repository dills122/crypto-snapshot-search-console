import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import coins, { Coin } from '../data/stocks';
import urlUtil from '../util/url-util';

interface CoinData {
  [key: string]: number;
}
interface CoinDataResponse {
  data: {
    currency: string;
    rates: CoinData;
  };
}

@Component({
  selector: 'app-coin-snapshot',
  templateUrl: './coin-snapshot.component.html',
  styleUrls: ['./coin-snapshot.component.scss'],
})
export class CoinSnapshotComponent implements OnInit {
  coins = coins;
  symbol: string | null;
  defaultCoin: Coin;
  coinData: CoinData | undefined;
  constructor(
    private route: ActivatedRoute,
    private http: CustomHttpClientService
  ) {
    this.defaultCoin = {
      symbol: 'DEFAULT',
      name: 'DEFAULT',
      link: 'DEFAULT',
    };
    this.symbol = this.route.snapshot.paramMap.get('symbol');
  }

  ngOnInit(): void {
    if (this.symbol) {
      this.getCoinData(this.symbol);
    }
  }

  findCoinBySymbol(symbol: string | null) {
    const coin = this.coins.find((coin) => coin.symbol === symbol);
    if (!coin) {
      return this.defaultCoin;
    }
    return coin;
  }

  isDefault(coin: Coin) {
    return coin.name === 'DEFAULT' && coin.symbol === 'DEFAULT';
  }

  getCoinData(symbol: string) {
    const apiUrl = urlUtil.constructCoinDataUrl(symbol);
    this.http.get<CoinDataResponse>(apiUrl).subscribe((coin) => {
      this.coinData = coin.data.rates;
      console.log(coin);
    });
  }
}
