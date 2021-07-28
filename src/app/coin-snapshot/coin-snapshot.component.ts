import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import { Currency } from '../shared/currency.interface';
import urlUtil from '../util/url-util';
import { SEOMetaData } from '../shared/meta-data.interface';
import navigationUtil from '../util/navigation-state';
import { SEOService } from '../services/seo.service';

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
  symbol: string | null;
  defaultCoin: Currency;
  coinData: CoinData | undefined;
  name: string | undefined;

  private metaData: SEOMetaData;
  constructor(
    private route: ActivatedRoute,
    private http: CustomHttpClientService,
    private title: Title,
    private router: Router,
    private seoService: SEOService
  ) {
    const navState = navigationUtil.getStateObject(
      this.router.getCurrentNavigation()
    );
    if (navState !== undefined) {
      this.name = navState['name'];
    }
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
      this.seoService.setAllTags(this.metaData);
    }
  }

  getCoinData(symbol: string) {
    const apiUrl = urlUtil.constructCoinDataUrl(symbol);
    this.http.get<CoinDataResponse>(apiUrl).subscribe((coin) => {
      this.coinData = coin.data.rates;
      console.log(coin);
    });
  }
}
