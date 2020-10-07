import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeManualComponent } from './barcode-manual.component';

describe('BarcodeManualComponent', () => {
  let component: BarcodeManualComponent;
  let fixture: ComponentFixture<BarcodeManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
