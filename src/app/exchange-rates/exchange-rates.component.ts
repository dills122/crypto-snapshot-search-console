import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import urlUtil from '../util/url-util';
import { SEOMetaData } from '../shared/meta-data.interface';
import navigationUtil from '../util/navigation-state';
import { SEOService } from '../services/seo.service';

interface CurrencyData {
  [key: string]: number;
}
interface CurrencyDataResponse {
  data: {
    currency: string;
    rates: CurrencyData;
  };
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
})
export class CurrencyExchangeRatesComponent implements OnInit {
  symbol: string | null;
  currencyData: CurrencyData | undefined;
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
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.metaData = {
      title: `${this.symbol} Current Exchange Rates`,
      description: `Check ${this.symbol}'s current exchange rates aganist all the major crypto projects`,
    };
  }

  ngOnInit(): void {
    if (this.symbol) {
      this.getCurrencyData(this.symbol);
      this.title.setTitle(this.metaData.title);
      this.seoService.setAllTags(this.metaData);
    }
  }

  getCurrencyData(symbol: string) {
    const apiUrl = urlUtil.constructCurrencyDataUrl(symbol);
    this.http.get<CurrencyDataResponse>(apiUrl).subscribe((currency) => {
      this.currencyData = currency.data.rates;
    });
  }
}
