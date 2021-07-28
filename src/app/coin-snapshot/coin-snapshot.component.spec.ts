import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSnapshotComponent } from './coin-snapshot.component';

describe('CoinSnapshotComponent', () => {
  let component: CoinSnapshotComponent;
  let fixture: ComponentFixture<CoinSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
