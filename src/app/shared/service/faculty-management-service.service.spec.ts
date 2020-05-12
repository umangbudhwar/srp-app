import { TestBed } from '@angular/core/testing';

import { FacultyManagementServiceService } from './faculty-management-service.service';

describe('FacultyManagementServiceService', () => {
  let service: FacultyManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
