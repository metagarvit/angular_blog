import { TestBed } from '@angular/core/testing';

import { ToastTrigerService } from './toast-triger.service';

describe('ToastTrigerService', () => {
  let service: ToastTrigerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastTrigerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
