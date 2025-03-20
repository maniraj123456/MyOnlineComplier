import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-bottom-sheet',
  imports: [MatListModule, MatIcon],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css',
})
export class BottomSheetComponent {

  links: any;
  
  showInfo(_t5: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
