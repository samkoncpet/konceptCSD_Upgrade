import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomOrganizationlistComponent } from './cell-custom-organizationlist.component';

describe('CellCustomOrganizationlistComponent', () => {
  let component: CellCustomOrganizationlistComponent;
  let fixture: ComponentFixture<CellCustomOrganizationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCustomOrganizationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomOrganizationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
