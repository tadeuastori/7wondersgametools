import { TestBed } from '@angular/core/testing';

import { ApplicationMenuListService } from './application-menu-list.service';

describe('ApplicationMenuListService', () => {
  let service: ApplicationMenuListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationMenuListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
