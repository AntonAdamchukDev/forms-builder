import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicalFormComponent } from './dynamical-form.component';

describe('DynamicalFormComponent', () => {
  let component: DynamicalFormComponent;
  let fixture: ComponentFixture<DynamicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicalFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
