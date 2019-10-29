import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxPriceInvoiceListComponent } from './max-price-invoice-list.component';

describe('MaxPriceInvoiceListComponent', () => {
  let component: MaxPriceInvoiceListComponent;
  let fixture: ComponentFixture<MaxPriceInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxPriceInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxPriceInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
