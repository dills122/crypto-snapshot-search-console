import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinSnapshotComponent } from './coin-snapshot/coin-snapshot.component';
import { CoinListComponent } from './coin-list/coin-list.component';

const routes: Routes = [
  { path: '', component: CoinListComponent },
  { path: 'coin/:symbol', component: CoinSnapshotComponent },
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
