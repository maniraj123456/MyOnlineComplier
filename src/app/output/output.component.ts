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

      // Create the HTML document inside the iframe
      doc.open();
      doc.write(`
        <html>
        <head>
          <style>${this.css}</style>
        </head>
        <body>
          ${this.html}
          <script>
            // Intercept console.log to push messages to parent
            const logs = [];
            console.log = function(message) {
              logs.push(message);
              window.parent.postMessage({ type: 'consoleLog', message: message }, '*');
            };

            // Execute the provided JS
            ${this.js}
          </script>
        </body>
        </html>
      `);
      doc.close();

      // Listen for the console logs sent from the iframe
      window.addEventListener('message', (event) => {
        if (event.data.type === 'consoleLog') {
          this.logs.push(event.data.message);
        }
      });
    }
  }
}
