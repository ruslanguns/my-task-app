import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from './task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  private get collection() {
    return this.firestore.collection<Task>('tasks');
  }

  getTasks() {
    return this.collection.valueChanges();
  }

  async createTask(task: Task) {
    return await this.collection
      .add(task)
      .catch((error) => console.error(error));
  }

  updateTask(task: any) {}
  deleteTask(id: string) {}
}
