import { Injectable } from '@angular/core';
import { Mytask } from '../shared/mytask';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {



  constructor(private AFS: AngularFirestore) { }
  //create Task

  AddTask(task: Mytask) {
    return new Promise<any>((resolve, reject) => {
      this.AFS
        .collection('task-collection')
        .add(task)
        .then(response => {
          console.log(response)
        }, error => reject(error));
    });
  }

  // fetch single  task 
  GetTask(id: string) {
    return this.AFS
      .collection('task-collection')
      .doc(id)
      .valueChanges()
  }

  //Fetch Task List
  GetTasksList() {
    return this.AFS
      .collection('task-collection')
      .snapshotChanges();
  }

  //update task object
  UpdateTask(task: Mytask, id: string) {
    return this.AFS
      .collection('task-collection')
      .doc(id)
      .update({
        details: task.details,
        completed: task.completed
      });
  }

  DeleteTask(task :Mytask) {
    return this.AFS
      .collection('task-collection')
      .doc(task.id)
      .delete();
  }
}
