import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAComponent } from './profile-a.component';

describe('ProfileAComponent', () => {
  let component: ProfileAComponent;
  let fixture: ComponentFixture<ProfileAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
