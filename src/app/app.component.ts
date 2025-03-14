import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HeadingComponent } from './heading/heading.component';
import { LoginComponent } from "./SharedComponents/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadingComponent, EditorComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyOnlineComplier';
}
