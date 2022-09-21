import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditTaskComponent } from './edit-task/edit-task.component'
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [

  { path: '', redirectTo: 'all-task', pathMatch: 'full' },
  { path: 'all-task', component: TaskListComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
