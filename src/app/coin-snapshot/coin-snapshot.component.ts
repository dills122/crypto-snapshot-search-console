import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import coins, { Coin } from '../data/stocks';
import urlUtil from '../util/url-util';
import { SEOMetaData } from '../shared/meta-data.interface';

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
  private metaData: SEOMetaData;
  constructor(
    private route: ActivatedRoute,
    private http: CustomHttpClientService,
    private title: Title,
    private meta: Meta
  ) {
    this.defaultCoin = {
      symbol: 'DEFAULT',
      name: 'DEFAULT',
      link: 'DEFAULT',
    };
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.metaData = {
      title: `${this.symbol} Current Exchange Rates`,
      description: `Check ${this.symbol}'s current exchange rates aganist all the major crypto projects`,
    };
  }

  ngOnInit(): void {
    if (this.symbol) {
      this.getCoinData(this.symbol);
      this.title.setTitle(this.metaData.title);
      this.meta.updateTag({
        name: 'description',
        content: this.metaData.description,
      });

      // Twitter metadata
      this.meta.addTag({ name: 'twitter:card', content: 'summary' });
      // this.meta.addTag({ name: 'twitter:site', content: '@AngularUniv' });
      this.meta.addTag({
        name: 'twitter:title',
        content: this.metaData.description,
      });
      this.meta.addTag({
        name: 'twitter:description',
        content: this.metaData.description,
      });
      this.meta.addTag({
        name: 'twitter:text:description',
        content: this.metaData.description,
      });
      // this.meta.addTag({
      //   name: 'twitter:image',
      //   content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200',
      // });
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
