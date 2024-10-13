import { TestBed } from '@angular/core/testing';

import { ContactApiServiceService } from './contact-api-service.service';

describe('ContactApiServiceService', () => {
  let service: ContactApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
