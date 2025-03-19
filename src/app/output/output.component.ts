import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-output',
  imports: [CommonModule],
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements AfterViewInit, OnChanges {
  @Input() html: string = '';
  @Input() css: string = '';
  @Input() js: string = '';
  @ViewChild('outputFrame', { static: false }) outputFrame!: ElementRef;

  logs: string[] = []; // Array to store console logs

  ngAfterViewInit() {
    this.generateOutput();
  }

  ngOnChanges() {
    this.generateOutput();
  }

  generateOutput() {
    if (this.outputFrame) {
      const iframe = this.outputFrame.nativeElement;
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      // Reset logs when output regenerates
      this.logs = [];

      doc.open();
      doc.write(`
        <html>
        <head>
          <style>${this.css}</style>
        </head>
        <body>
          ${this.html}
          <script>
            ${this.js}
          <\/script>
        </body>
        </html>
      `);
      doc.close();

      // Listen for log messages from the iframe
      window.addEventListener('message', (event) => {
        if (event.data.type === 'consoleLog') {
          this.logs.push(event.data.data);
        }
      });
    }
  }
}