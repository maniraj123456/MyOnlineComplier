import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HeadingComponent } from './heading/heading.component';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyOnlineCompiler';
}
