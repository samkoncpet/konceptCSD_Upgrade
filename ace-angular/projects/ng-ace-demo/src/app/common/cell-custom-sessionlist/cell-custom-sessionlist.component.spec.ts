import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomSessionlistComponent } from './cell-custom-sessionlist.component';

describe('CellCustomSessionlistComponent', () => {
  let component: CellCustomSessionlistComponent;
  let fixture: ComponentFixture<CellCustomSessionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomSessionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomSessionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
