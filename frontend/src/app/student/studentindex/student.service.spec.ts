import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentService } from './student.service';

describe('StudentService Unit Tests', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 3: Aldin Memic
  it('[Aldin Memic] should delete a student', (done) => {
    const dummyResponse = { success: true };
    service.deleteStudent(12).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/student/deleteStudent?studentId=12');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  // Test 8: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should update student details', (done) => {
    const updateModel = { id: 12, name: 'John Doe Update' };
    const dummyResponse = { success: true };
    service.updateStudent(updateModel).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/student/updateStudent');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updateModel);
    req.flush(dummyResponse);
  });
});
