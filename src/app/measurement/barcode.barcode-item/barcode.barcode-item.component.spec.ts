import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Barcode.BarcodeItemComponent } from './barcode.barcode-item.component';

describe('Barcode.BarcodeItemComponent', () => {
  let component: Barcode.BarcodeItemComponent;
  let fixture: ComponentFixture<Barcode.BarcodeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Barcode.BarcodeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Barcode.BarcodeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
