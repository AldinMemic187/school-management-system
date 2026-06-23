import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeacherService } from './teacher.service';

describe('TeacherService Unit Tests', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeacherService]
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 4: Aldin Memic
  it('[Aldin Memic] should update teacher details', (done) => {
    const updateModel = { id: 3, name: 'Jane Smith Update' };
    const dummyResponse = { success: true };
    service.updateTeacher(updateModel).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/teacher/updateTeacher');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updateModel);
    req.flush(dummyResponse);
  });

  // Test 9: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should fetch teacher by ID', (done) => {
    const dummyTeacher = { id: 3, name: 'Jane Smith' };
    service.getTeacher(3).subscribe(teacher => {
      expect(teacher).toEqual(dummyTeacher);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/teacher/getbyId?teacherId=3');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTeacher);
  });
});
