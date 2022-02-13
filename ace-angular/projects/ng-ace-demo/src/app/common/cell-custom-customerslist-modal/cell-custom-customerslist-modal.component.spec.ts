import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomCustomerslistModalComponent } from './cell-custom-customerslist-modal.component';

describe('CellCustomCustomerslistModalComponent', () => {
  let component: CellCustomCustomerslistModalComponent;
  let fixture: ComponentFixture<CellCustomCustomerslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomCustomerslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomCustomerslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
