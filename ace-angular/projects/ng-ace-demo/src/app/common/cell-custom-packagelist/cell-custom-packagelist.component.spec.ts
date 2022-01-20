import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomPackagelistComponent } from './cell-custom-packagelist.component';

describe('CellCustomPackagelistComponent', () => {
  let component: CellCustomPackagelistComponent;
  let fixture: ComponentFixture<CellCustomPackagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomPackagelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomPackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
