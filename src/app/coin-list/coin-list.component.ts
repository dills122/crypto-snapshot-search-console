import { Component, OnInit } from '@angular/core';
import coins from '../data/stocks';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  coins = coins;
  constructor() {}

  ngOnInit(): void {}
}
