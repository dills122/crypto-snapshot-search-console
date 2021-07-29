import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeRatesComponent } from './exchange-rates.component';

describe('CoinSnapshotComponent', () => {
  let component: CurrencyExchangeRatesComponent;
  let fixture: ComponentFixture<CurrencyExchangeRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyExchangeRatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
