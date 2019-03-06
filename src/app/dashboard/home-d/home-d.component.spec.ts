import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDComponent } from './home-d.component';

describe('HomeDComponent', () => {
  let component: HomeDComponent;
  let fixture: ComponentFixture<HomeDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
