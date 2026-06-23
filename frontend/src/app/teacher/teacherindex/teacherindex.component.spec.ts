import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { TeacherindexComponent } from './teacherindex.component';
import { TeacherService } from './teacher.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TeacherindexComponent Integration Tests', () => {
  let component: TeacherindexComponent;
  let fixture: ComponentFixture<TeacherindexComponent>;
  let mockTeacherService: jest.Mocked<TeacherService>;

  beforeEach(async () => {
    mockTeacherService = {
      getTeacherAll: jest.fn().mockReturnValue(of([])),
      insertTeacher: jest.fn(),
      updateTeacher: jest.fn(),
      deleteTeacher: jest.fn(),
      getTeacher: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [TeacherindexComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: TeacherService, useValue: mockTeacherService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherindexComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Aldin Memic
  it('[Aldin Memic] should load all teachers on init', () => {
    const dummyTeachers = [
      { id: 1, name: 'Alice', email: 'alice@school.com' },
      { id: 2, name: 'Bob', email: 'bob@school.com' }
    ];
    mockTeacherService.getTeacherAll.mockReturnValue(of(dummyTeachers));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mockTeacherService.getTeacherAll).toHaveBeenCalled();
    expect(component.data).toEqual(dummyTeachers);
  });

  // Test 2: Aldin Memic
  it('[Aldin Memic] should call insertTeacher service when a valid teacher is added', () => {
    const dummyTeachers: any[] = [];
    mockTeacherService.getTeacherAll.mockReturnValue(of(dummyTeachers));
    mockTeacherService.insertTeacher.mockReturnValue(of(1)); // returns new ID

    fixture.detectChanges(); // init

    component.openInsertDialog();
    component.teacherForm.setValue({
      name: 'Charlie',
      email: 'charlie@school.com',
      password: 'password123'
    });

    component.insertTeacher();

    expect(mockTeacherService.insertTeacher).toHaveBeenCalledWith({
      name: 'Charlie',
      email: 'charlie@school.com',
      password: 'password123'
    });
  });

  // Test 3: Aldin Memic
  it('[Aldin Memic] should show alert and not call updateTeacher service when name or email is empty during save', () => {
    const windowAlertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    fixture.detectChanges(); // init
    
    component.selectedTeacher = { id: 1, name: 'Old Name', email: 'old@school.com' };
    component.openUpdateDialog(component.selectedTeacher);
    
    // Set invalid form values
    component.teacherForm.setValue({
      name: '',
      email: '',
      password: ''
    });

    component.saveTeacher();

    expect(windowAlertSpy).toHaveBeenCalledWith('Please fill in name and email fields.');
    expect(mockTeacherService.updateTeacher).not.toHaveBeenCalled();

    windowAlertSpy.mockRestore();
  });
});
