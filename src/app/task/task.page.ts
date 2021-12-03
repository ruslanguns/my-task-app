import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  ngForm: FormGroup;
  tasks$ = this.taskService.getTasks();

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
      this.taskService.createTask({
        description,
        createdAt: new Date().toISOString(),
      });
    }
  }

  onDelete(id: string) {
    console.log(id);
    this.taskService.deleteTask(id);
  }
}
