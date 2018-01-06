import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSeasonsComponent } from './manage-seasons.component';

describe('ManageSeasonsComponent', () => {
  let component: ManageSeasonsComponent;
  let fixture: ComponentFixture<ManageSeasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSeasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
