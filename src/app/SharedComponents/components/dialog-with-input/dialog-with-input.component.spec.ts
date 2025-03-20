import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithInputComponent } from './dialog-with-input.component';

describe('DialogWithInputComponent', () => {
  let component: DialogWithInputComponent;
  let fixture: ComponentFixture<DialogWithInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWithInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
