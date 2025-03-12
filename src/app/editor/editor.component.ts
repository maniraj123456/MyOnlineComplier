import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  imports: [FormsModule,OutputComponent]
})
export class EditorComponent {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  generateOutput() {
    // Trigger output rendering in child component
  }
}

