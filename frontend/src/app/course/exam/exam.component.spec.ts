import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ExamComponent } from './exam.component';
import { ExamService } from './exam.service';
import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExamComponent Integration Tests', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;
  let mockExamService: jest.Mocked<ExamService>;
  let mockMessageService: jest.Mocked<MessageService>;
  const mockRouter = {
    navigate: jest.fn()
  };
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('42')
      }
    }
  };

  beforeEach(async () => {
    mockExamService = {
      getExamsByCourseId: jest.fn().mockReturnValue(of([])),
      addExam: jest.fn(),
      updateExam: jest.fn(),
      deleteExam: jest.fn(),
      deleteExams: jest.fn()
    } as any;

    mockMessageService = {
      add: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ExamComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ExamService, useValue: mockExamService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .overrideComponent(ExamComponent, {
      set: {
        providers: [
          { provide: MessageService, useValue: mockMessageService }
        ]
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamComponent);
    component = fixture.componentInstance;
  });

  // Test 4: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should parse courseId from route params and load exams on init', () => {
    const dummyExams = [{ id: 1, name: 'Midterm', courseId: 42, durationMinutes: 60 }];
    mockExamService.getExamsByCourseId.mockReturnValue(of(dummyExams));

    fixture.detectChanges(); // triggers ngOnInit and constructor logic

    expect(component.courseId).toBe(42);
    expect(mockExamService.getExamsByCourseId).toHaveBeenCalledWith(42);
    expect(component.exams).toEqual(dummyExams);
  });

  // Test 5: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should call addExam service when a new exam with valid data is saved', () => {
    mockExamService.getExamsByCourseId.mockReturnValue(of([]));
    mockExamService.addExam.mockReturnValue(of({ success: true }));

    fixture.detectChanges(); // init

    component.openNew();
    component.exam.name = 'Final Exam';
    component.exam.durationMinutes = 90;

    component.saveExam();

    expect(mockExamService.addExam).toHaveBeenCalledWith({
      courseId: 42,
      durationMinutes: 90,
      name: 'Final Exam'
    });
    expect(mockMessageService.add).toHaveBeenCalledWith(expect.objectContaining({
      severity: 'success',
      detail: 'Exam Created'
    }));
  });

  // Test 6: Ljundrim Ganiji
  it('[Ljundrim Ganiji] should navigate to exam-questions route when showQuestions is called', () => {
    fixture.detectChanges(); // init

    const dummyExam = { id: 101, name: 'Math Exam' };
    component.showQuestions(dummyExam);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/course/exam/exam-questions/101']);
  });
});
