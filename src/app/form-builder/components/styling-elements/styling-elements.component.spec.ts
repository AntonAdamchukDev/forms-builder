import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingElementsComponent } from './styling-elements.component';

describe('StylingElementsComponent', () => {
  let component: StylingElementsComponent;
  let fixture: ComponentFixture<StylingElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylingElementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylingElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
