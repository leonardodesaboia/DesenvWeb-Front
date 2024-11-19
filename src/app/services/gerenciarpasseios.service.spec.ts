import { TestBed } from '@angular/core/testing';

import { PasseioService } from './gerenciarpasseios.service';

describe('PasseioService', () => {
  let service: PasseioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasseioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
