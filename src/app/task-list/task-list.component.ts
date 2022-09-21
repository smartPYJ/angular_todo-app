import { Component, OnInit } from '@angular/core';

import { trigger, transition, state, animate, style } from '@angular/animations';
import { CrudService } from './../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Mytask } from '../shared/mytask';
import { Router } from '@angular/router';
import { ToastrServiceService } from '../shared/toastr-service.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        height: '100px',
        opacity: 1,

      })),
      state('closed', style({
        height: '50px',
        width: '90px',
        opacity: 0.8,
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'overflow': 'hidden'

      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
})

export class TaskListComponent implements OnInit {
  task: Mytask[] =[];
  public tasksForm: FormGroup;


  constructor(

    public crudApi: CrudService,
    public fb: FormBuilder,
  
    public router: Router,
    private toastr : ToastrServiceService

  ) {

    this.tasksForm = this.fb.group({
      details: [''],
      completed: [false]
    })
  }


  ngOnInit() {
    this.crudApi.GetTasksList();
    
    this.crudApi.GetTasksList().subscribe(res =>{
      this.task = res.map(e =>{
        return{
          id : e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Mytask;
      
        
      })
    });

  }


  deleteTask(task: Mytask) {
    if (window.confirm('Are sure you want to delete this Task ?')) {
      this.crudApi.DeleteTask(task)
     this.toastr.success(' successfully deleted!');
    }
  }


  taskForm() {
    this.tasksForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get details() {
    return this.tasksForm.get('details');
  
    
  }


  ResetForm() {
    this.tasksForm.reset();
  }


  submitTaskData() {
    this.crudApi.AddTask(this.tasksForm.value);
   this.toastr.success(
       'Task successfully added!'
    );
    this.ResetForm();
  }

  isDisabled = false;
  isOpen = false;
  toggleAnimations() {
    this.isDisabled = !this.isDisabled;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}


