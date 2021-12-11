import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagehistoryComponent } from './packagehistory.component';

describe('PackagehistoryComponent', () => {
  let component: PackagehistoryComponent;
  let fixture: ComponentFixture<PackagehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagehistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
