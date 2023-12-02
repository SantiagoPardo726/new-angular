import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  welcome = 'Hola nuevo mundo';
  tasks = [ 'Tarea 1', 'Tarea 2', 'Tarea 3' ];
}
