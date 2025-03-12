import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  @Input() html: string = '';
  @Input() css: string = '';
  @Input() js: string = '';
  sanitizedOutput: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.generateOutput();
  }

  generateOutput() {
    const combinedHtml = `
      ${this.html}
      <style>${this.css}</style>
      <script>${this.js}<\/script>
    `;
    this.sanitizedOutput = this.sanitizer.bypassSecurityTrustHtml(combinedHtml);
  }
}

