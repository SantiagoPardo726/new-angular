import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'app';
  welcome = 'Hola nuevo mundo';
  tasks = signal([ 'Tarea 1', 'Tarea 2', 'Tarea 3' ]);
  // name = 'Santiago';
  name = signal('Santiago');
  edad = 21;
  disable = false;
  img = 'https://www.w3schools.com/howto/img_avatar.jpg';
  person={
    name: 'Santiago',
    age: 21,
    avatar: 'https://www.w3schools.com/howto/img_avatar.jpg'
  };
  

  clickHandler() {
    alert('Hola');
  }
  changeHandler(event:Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  keydownHandler(event:KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

}
