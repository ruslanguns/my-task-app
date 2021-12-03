import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from './task.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  private get collection() {
    return this.firestore.collection<Task>('tasks');
  }

  getTasks(): Observable<Task[]> {
    return this.collection.snapshotChanges().pipe(
      map((docs) =>
        docs.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }

  async createTask(task: Task) {
    return await this.collection
      .add({ ...task, completed: false })
      .catch((error) => console.error(error));
  }

  updateTask(id: string, task: Partial<Task>) {
    return this.collection.doc(id).update(task);
  }

  async deleteTask(id: string) {
    return await this.collection.doc(id).delete();
  }
}
