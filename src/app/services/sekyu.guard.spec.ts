import { TestBed } from '@angular/core/testing';

import { SekyuGuard } from './sekyu.guard';

describe('SekyuGuard', () => {
  let guard: SekyuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SekyuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
