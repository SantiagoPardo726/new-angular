import { Component, computed, signal, effect, inject, Injector } from '@angular/core';

import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(Injector);
  constructor(){
    
  };
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      this.tasks.set(JSON.parse(storage));
    }
    this.trackTasks();
  };

  trackTasks(){
    effect(()=>{
      const tasks = this.tasks();
      localStorage.setItem('tasks',JSON.stringify(tasks));
    },{injector: this.injector});
  }


  filter = signal<'all' | 'pending'|'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });
  
  changeHandler() {
    if(this.newTaskCtrl.valid){
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue('');
    }
  };
  addTask(title: string){
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, i) => i !== index));
  }
  updateTask(index: number) {
    this.tasks.update((tasks) =>{
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    });
  }

  updateTaskEditingMode(index:number){
    this.tasks.update((tasks) =>{
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        }
      })
    });
  }
  updateTaskText(index:number,event:Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) =>{
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return {
          ...task,
          editing: false,
        }
      })
    });
  }
  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
