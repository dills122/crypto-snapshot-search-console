import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import { Currency } from '../shared/currency.interface';
import { SEOService } from '../services/seo.service';
import { SEOMetaData } from '../shared/meta-data.interface';

interface CurrenciesResponse {
  data: [CurrencyObject];
}

interface CurrencyObject {
  id: string;
  name: string;
  min_size: number;
}

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  currencies: Currency[] = [];
  private metaData: SEOMetaData = {
    title: 'Fiat to Crypto Exchange Rates',
    description:
      'Check all major Fiat currencies exchange rates to major crypto projects',
  };
  constructor(
    private http: CustomHttpClientService,
    private title: Title,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.title.setTitle(this.metaData.title);
    this.seoService.setAllTags(this.metaData);
  }

  getCurrencies() {
    this.http
      .get<CurrenciesResponse>('https://api.coinbase.com/v2/currencies')
      .subscribe((currencies) => {
        this.currencies = currencies.data.map((currency) => {
          return {
            name: currency.name,
            symbol: currency.id,
          };
        });
      });
  }
}
