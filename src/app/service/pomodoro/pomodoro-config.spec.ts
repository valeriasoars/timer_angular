import { TestBed } from '@angular/core/testing';

import { PomodoroConfig } from './pomodoro-config';

describe('PomodoroConfig', () => {
  let service: PomodoroConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
