import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomCustomerslistComponent } from './cell-custom-customerslist.component';

describe('CellCustomCustomerslistComponent', () => {
  let component: CellCustomCustomerslistComponent;
  let fixture: ComponentFixture<CellCustomCustomerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomCustomerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomCustomerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
