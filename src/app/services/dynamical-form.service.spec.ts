import { TestBed } from '@angular/core/testing';

import { DynamicalFormService } from './dynamical-form.service';

describe('DynamicalFormService', () => {
  let service: DynamicalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
