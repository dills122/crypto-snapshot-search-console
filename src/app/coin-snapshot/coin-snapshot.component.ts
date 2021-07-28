import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import coins, { Coin } from '../data/stocks';

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
  coin: Coin;
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
    const symbol = this.route.snapshot.paramMap.get('symbol');
    this.coin = this.findCoinBySymbol(symbol);
  }

  ngOnInit(): void {
    if (!this.isDefault(this.coin)) {
      this.getCoinData(this.coin);
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

  getCoinData(coin: Coin) {
    this.http.get<CoinDataResponse>(coin.link).subscribe((coin) => {
      this.coinData = coin.data.rates;
      console.log(coin);
    });
  }
}
