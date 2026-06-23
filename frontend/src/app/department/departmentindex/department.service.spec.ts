import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService Unit Tests', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 2: Aldin Memic
  it('[Aldin Memic] should insert a new department', (done) => {
    const newDept = { name: 'IT' };
    const dummyResponse = { success: true, id: 10 };
    service.insertDepartment(newDept).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/department/insertDepartment');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newDept);
    req.flush(dummyResponse);
  });

  // Test 7: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should fetch department details by ID', (done) => {
    const dummyDept = { id: 5, name: 'Physics' };
    service.getDepartment(5).subscribe(dept => {
      expect(dept).toEqual(dummyDept);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/department/getbyId?departmentId=5');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDept);
  });
});
