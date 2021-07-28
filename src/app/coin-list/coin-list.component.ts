import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from '../core/custom-http-client.service';
import coins from '../data/stocks';

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
  constructor(private http: CustomHttpClientService) {}

  ngOnInit(): void {
    this.getCurrencies();
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
