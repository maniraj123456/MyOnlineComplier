import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-heading',
  imports: [MatIconModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css'
})
export class HeadingComponent {
  @Output() resetEvent = new EventEmitter<void>(); // Create an event emitter

  triggerReset() {
    this.resetEvent.emit(); // Emit event when reset button is clicked
  }
}
