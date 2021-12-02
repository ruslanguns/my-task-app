import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Task } from './task.interface';

@Injectable()
export class TaskService {
  constructor(private firestore: Firestore) {}

  get collection() {
    return collection(this.firestore, 'tasks');
  }

  getTasks() {
    return collectionData(this.collection);
  }

  getTask(id: string) {}
  createTask(task: any) {}
  updateTask(task: any) {}
  deleteTask(id: string) {}
}
