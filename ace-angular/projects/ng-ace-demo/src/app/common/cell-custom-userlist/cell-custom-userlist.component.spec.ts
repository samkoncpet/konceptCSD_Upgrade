import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomUserlistComponent } from './cell-custom-userlist.component';

describe('CellCustomUserlistComponent', () => {
  let component: CellCustomUserlistComponent;
  let fixture: ComponentFixture<CellCustomUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomUserlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
