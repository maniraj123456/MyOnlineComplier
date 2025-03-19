import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements AfterViewInit {
  @Input() html: string = '';
  @Input() css: string = '';
  @Input() js: string = '';
  @ViewChild('outputFrame', { static: false }) outputFrame!: ElementRef;

  ngAfterViewInit() {
    this.generateOutput();
  }

  ngOnChanges() {
    this.generateOutput();
  }

  generateOutput() {
    if (this.outputFrame) {
      const doc = this.outputFrame.nativeElement.contentDocument || this.outputFrame.nativeElement.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <style>${this.css}</style>
        </head>
        <body>
          ${this.html}
          <script>${this.js}<\/script>
        </body>
        </html>
      `);
      doc.close();
    }
  }

}
