import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService Unit Tests', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 1: Aldin Memic
  it('[Aldin Memic] should fetch all courses', (done) => {
    const dummyCourses = [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }];
    service.getCourseAll().subscribe(courses => {
      expect(courses).toEqual(dummyCourses);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/course/getAll');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  // Test 6: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should fetch student courses', (done) => {
    const dummyCourses = [{ id: 1, name: 'Math' }];
    service.getStudentCourses().subscribe(courses => {
      expect(courses).toEqual(dummyCourses);
      done();
    });

    const req = httpMock.expectOne('https://localhost:7123/api/course/GetStudentCourses');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });
});
