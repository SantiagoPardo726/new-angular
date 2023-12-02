import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'app';
  welcome = 'Hola nuevo mundo';
  tasks = signal(['Tarea 1', 'Tarea 2', 'Tarea 3']);
  // name = 'Santiago';
  name = signal('Santiago');
  edad = 21;
  disable = false;
  img = 'https://www.w3schools.com/howto/img_avatar.jpg';
  person = signal({
    name: 'Santiago',
    age: 21,
    avatar: 'https://www.w3schools.com/howto/img_avatar.jpg',
  });

  colorCtrl = new FormControl();

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
    

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return { ...prevState, age: parseInt(newValue, 10) };
    });
  }
  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return { ...prevState, name: newValue };
    });
  }

  clickHandler() {
    alert('Hola');
  }
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
