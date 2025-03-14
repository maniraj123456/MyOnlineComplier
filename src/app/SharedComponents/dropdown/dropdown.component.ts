import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  ],
  standalone: true, // For better tree-shaking and lazy loading
})
export class DropdownFieldComponent implements OnInit, OnChanges {
  
  @Input() control!: FormControl<any>;
  
  @Input() label!: string;
  
  @Input() options: { value: any; label: string }[] = [];
  
  @Input() errorMessage: string = 'This field is required';
  
  @Input() required: boolean = false;
  
  @Input() disabled: boolean = false;
  
  @Input() placeholder: string = '';
  
  @Input() compareWith: (o1: any, o2: any) => boolean = (o1, o2) => o1 === o2; // Customize comparison
  
  @Input() filterable: boolean = false; // Allows for filtering
  
  @Input() resetOnOptionSelect: boolean = false; // reset the selected value after selecting an option
  
  @Output() selectionChange = new EventEmitter<any>(); // Emit when selection changes

  filteredOptions: { value: any; label: string }[] = [];
  
  filterValue: string = '';

  ngOnInit() {
    this.filteredOptions = [...this.options];
    if (this.required && !this.control) {
      this.control = new FormControl('', Validators.required);
    } else if (!this.control) {
      this.control = new FormControl();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && changes['options'].currentValue) {
      this.filteredOptions = [...changes['options'].currentValue];
      this.filterOptions();
    }
    if(changes['disabled']){
      if(changes['disabled'].currentValue === true){
        this.control?.disable();
      }else{
        this.control?.enable();
      }
    }
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.value);
    if(this.resetOnOptionSelect){
        this.control.setValue(null);
    }
  }

  filterOptions() {
    if (!this.filterable || !this.filterValue) {
      this.filteredOptions = [...this.options];
      return;
    }

    const filter = this.filterValue.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(filter)
    );
  }

  onFilterChange(value: string) {
    this.filterValue = value;
    this.filterOptions();
  }

  getErrorMessage() {
    if (this.control?.hasError('required')) {
      return this.errorMessage;
    }
    return ''; // Add other error handling if needed
  }
}
