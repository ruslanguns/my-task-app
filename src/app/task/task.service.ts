import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from './task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  getTasks() {
    return this.firestore.collection<Task>('tasks').valueChanges();
  }

  getTask(id: string) {}
  createTask(task: any) {}
  updateTask(task: any) {}
  deleteTask(id: string) {}
}
