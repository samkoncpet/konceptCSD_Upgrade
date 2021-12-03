import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomActiveComponent } from './cell-custom-active.component';

describe('CellCustomActiveComponent', () => {
  let component: CellCustomActiveComponent;
  let fixture: ComponentFixture<CellCustomActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
