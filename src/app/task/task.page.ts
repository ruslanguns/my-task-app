import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  ngForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log(this.ngForm.value);
    } else {
      console.log('El formulario no es valido');
    }
  }
}
