import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Task } from './task.interface';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  ngForm: FormGroup;
  selectedTask: Task | undefined = undefined;
  tasks$ = this.taskService
    .getTasks()
    .pipe(map((tasks) => tasks.filter((x) => !x.completed)));

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.ngForm = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  get description() {
    return this.ngForm.get('description');
  }

  get descriptionLength() {
    return this.description?.value?.length;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.ngForm.valid) {
      const { description } = this.ngForm.value;

      if (this.selectedTask) {
        // es para editar
        this.taskService.updateTask(this.selectedTask.id, {
          description,
        });
        this.selectedTask = undefined;
      } else {
        this.taskService.createTask({
          description,
          createdAt: new Date().toISOString(),
        });
      }

      this.ngForm.reset();
    }
  }

  onDelete(id: string) {
    console.log(id);
    this.taskService.deleteTask(id);
  }

  onCompletedTask(id: string) {
    this.taskService.updateTask(id, { completed: true });
  }

  setSelectedTask(task: Task) {
    this.selectedTask = task;
    this.ngForm.setValue({ description: task.description });
    console.log(task);
  }
}
