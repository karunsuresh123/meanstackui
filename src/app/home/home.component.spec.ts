// home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let appServiceMock: jasmine.SpyObj<AppService>;

  beforeEach(() => {
    appServiceMock = jasmine.createSpyObj('AppService', ['addTask', 'deleteTask', 'editTask', 'getTasks']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask and refresh tasks', () => {
    const taskId = 123;
    appServiceMock.deleteTask.and.returnValue(of({}));
    spyOn(component, 'getTasks');

    component.deleteTask(taskId);

    expect(appServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.getTasks).toHaveBeenCalled();
  });

  it('should call editTask and refresh tasks', () => {
    const task = { id: 456, name: 'Updated Task' };
    appServiceMock.editTask.and.returnValue(of({}));
    spyOn(component, 'getTasks');

    component.editTask(task);

    expect(appServiceMock.editTask).toHaveBeenCalledWith(task);
    expect(component.getTasks).toHaveBeenCalled();
  });

  it('should retrieve tasks on component initialization', () => {
    const mockTasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
    appServiceMock.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(appServiceMock.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });
});