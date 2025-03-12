import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HeadingComponent } from './heading/heading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeadingComponent,EditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyOnlineComplier';
}
