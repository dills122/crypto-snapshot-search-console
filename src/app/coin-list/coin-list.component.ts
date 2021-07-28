import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import coins from '../data/stocks';
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
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  coins = coins;
  private metaData: SEOMetaData = {
    title: 'Fiat to Crypto Exchange Rates',
    description:
      'Check all major Fiat currencies exchange rates to major crypto projects',
  };
  constructor(
    private http: CustomHttpClientService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.getCurrencies();
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

  getCurrencies() {
    this.http
      .get<CurrenciesResponse>('https://api.coinbase.com/v2/currencies')
      .subscribe((currencies) => {
        this.coins = currencies.data.map((currency) => {
          return {
            name: currency.name,
            symbol: currency.id,
          };
        });
      });
  }
}
