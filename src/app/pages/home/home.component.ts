import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    { id: Date.now(), title: 'Crear Proyecto', completed: false },
    { id: Date.now(), title: 'Crear Proyecto 2', completed: false },
    { id: Date.now(), title: 'Crear Proyecto 3', completed: false },
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }
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
}