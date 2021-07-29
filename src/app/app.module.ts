import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { SEOService } from './services/seo.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    CurrencyExchangeRatesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [SEOService],
  bootstrap: [AppComponent],
})
export class AppModule {}
