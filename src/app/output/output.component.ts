import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';

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

  constructor(private cdRef: ChangeDetectorRef) {} 

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
  
      // Ensure the event listener is only added once
      window.removeEventListener('message', this.handleMessage);
      window.addEventListener('message', this.handleMessage);
  
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
            (function() {
              // Intercept console.log and send messages to parent
              const originalLog = console.log;
              console.log = function(...args) {
                originalLog.apply(console, args);
                window.parent.postMessage({ type: 'consoleLog', message: args.join(' ') }, '*');
              };
            })();
          </script>
          <script>${this.js}</script>
        </body>
        </html>
      `);
      doc.close();
    }
  }
  
  handleMessage = (event: MessageEvent) => {
    console.log(this.logs);
    if (event.data.type === 'consoleLog') {
      this.logs = [...this.logs, event.data.message]; 
      this.cdRef.detectChanges();
    }
  };
  
}
