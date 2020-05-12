import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFacultyComponent } from './register-faculty.component';

describe('RegisterFacultyComponent', () => {
  let component: RegisterFacultyComponent;
  let fixture: ComponentFixture<RegisterFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
