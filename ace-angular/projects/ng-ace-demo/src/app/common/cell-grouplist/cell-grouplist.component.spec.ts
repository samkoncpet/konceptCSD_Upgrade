import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellGrouplistComponent } from './cell-grouplist.component';

describe('CellGrouplistComponent', () => {
  let component: CellGrouplistComponent;
  let fixture: ComponentFixture<CellGrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellGrouplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellGrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
