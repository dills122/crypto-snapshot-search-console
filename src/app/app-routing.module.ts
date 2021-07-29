import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';

const routes: Routes = [
  { path: '', component: CurrencyListComponent },
  { path: 'currency/:symbol', component: CurrencyExchangeRatesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
