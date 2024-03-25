import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from the server', () => {
    const mockTasks = [
      { id: 1, task: 'Task 1', assignee: 'Assignee 1', status: 'Status 1'},
      { id: 2, task: 'Task 2', assignee: 'Assignee 2', status: 'Status 2'},
      { id: 3, task: 'Task 3', assignee: 'Assignee 3', status: 'Status 3'}
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service.rootURL + '/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a task to the server', () => {
    const mockTask = { id: 4, task: 'Task 4', assignee: 'Assignee 4', status: 'Status 4' };

    service.addTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockTask);
    });

    const req = httpMock.expectOne(service.rootURL + '/task');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ task: mockTask });
    req.flush(mockTask);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should edit a task on the server', () => {
    const mockTask = { id: 5, task: 'Task 5', assignee: 'Assignee 5', status: 'Status 5' };

    service.editTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockTask);
    });

    const req = httpMock.expectOne(service.rootURL + '/task');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ task: mockTask });
    req.flush(mockTask);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should delete a task from the server', () => {
    const taskId = 6;
  
    service.deleteTask(taskId).subscribe(response => {
      expect(response).toBeNull();
    });
  
    const req = httpMock.expectOne(`${service.rootURL}/task/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

});

