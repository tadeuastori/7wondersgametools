import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';
import { InputNumberSwipeComponent } from "../input-number-swipe/input-number-swipe.component";

@Component({
    selector: 'app-input-group-number-swipe',
    imports: [FormsModule, InputNumberSwipeComponent], 
    templateUrl: './input-group-number-swipe.component.html',
    styleUrl: './input-group-number-swipe.component.less'
})
export class InputGroupNumberSwipeComponent implements OnInit {
  @Input() values: number[] = [0, 0, 0, 0];
  @Input() score: number = 0;
  @Input() allowNegative: boolean = false;
  @Input() allowPositive: boolean = true;
  @Input() maximumPositiveNumber: number = 0;
  @Input() minimumNegativeNumber: number = 0;  
  @Input() displaySum: boolean = false;
  @Output() valuesChanged = new EventEmitter<number[]>();

  isEditing: boolean = false;
  private labelTimeout: any;

  ngOnInit() {}

  hideLabel() {
    this.isEditing = true;
  }

  resetLabelTimeout() {
    if (this.labelTimeout) {
      clearTimeout(this.labelTimeout);
    }

    this.labelTimeout = setTimeout(() => {
      this.isEditing = false;
    }, 1000);
  }

  onChangeValues(index: number, newValue: number) {
    this.hideLabel();
    this.values[index] = newValue;
    this.updateD();
    this.resetLabelTimeout();
    
    this.valuesChanged.emit(this.values);
  }

  onInputChange(event: any, index: number) {
    const newValue = event.target.valueAsNumber;

    if (Number.isNaN(newValue) || index < 3) return;

    if (!this.allowNegative || newValue < 0) {
      this.values[index] = Math.max(0, newValue);
      event.target.value = this.values[index];
    }

    this.updateD();
  }

  onTouchStart(event: any) {
    this.isEditing = true;
    event.target.select();
  }

  onInputBlur() {
    this.resetLabelTimeout();
  }

  updateD() {  
    const firstThree = this.values.slice(0, 3).filter(n => n !== null && n >= 0);
    if (firstThree.length > 0) {
      this.values[3] = Math.min(...firstThree);
    } else {
      this.values[3] = 0;
    }
  }
}
