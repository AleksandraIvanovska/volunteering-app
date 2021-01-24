import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerDrawerComponent } from './volunteer-drawer.component';

describe('VolunteerDrawerComponent', () => {
  let component: VolunteerDrawerComponent;
  let fixture: ComponentFixture<VolunteerDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
