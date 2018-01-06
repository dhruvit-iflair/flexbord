import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizerComponent } from './manage.component';

describe('ManageOrganizerComponent', () => {
  let component: ManageOrganizerComponent;
  let fixture: ComponentFixture<ManageOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
