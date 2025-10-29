import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';
import { HammerDirective } from 'src/app/core/directives/hammer.directive';

@Component({
    selector: 'app-input-group-number-swipe',
    imports: [HammerDirective, FormsModule], 
    templateUrl: './input-group-number-swipe.component.html',
    styleUrl: './input-group-number-swipe.component.less'
})
export class InputGroupNumberSwipeComponent implements OnInit {
  @Input() values: number[] = [0, 0, 0, 0];
  @Input() allowNegative: boolean = true;
  sum: number = 0;
  isEditing: boolean = false;
  private labelTimeout: any;

  ngOnInit() {
    this.updateSum();
  }

  hideLabel() {
    this.isEditing = true;
    this.updateSum();
  }

  onSwipeLeft(index: number) {
    if (index < 3) {
      this.hideLabel();
      this.values[index]++;
      this.updateSum();
      this.updateD();
      this.resetLabelTimeout();
    }
  }

  onSwipeRight(index: number) {
    if (index < 3 && this.allowNegative || this.values[index] > 0) {
      this.hideLabel();
      this.values[index]--;
      this.updateSum();
      this.updateD();
      this.resetLabelTimeout();
    }
  }

  onInputChange(event: any, index: number) {
    const newValue = event.target.valueAsNumber;

    if (Number.isNaN(newValue) || index < 3) return;

    if (!this.allowNegative || newValue < 0) {
      this.values[index] = Math.max(0, newValue);
      event.target.value = this.values[index];
    }

    this.updateSum();
    this.updateD();
  }

  onInputFocus(event: any) {
    this.isEditing = true;
    event.target.select();
    this.updateSum();
  }

  onInputBlur() {
    this.resetLabelTimeout();
  }

  updateSum() {
    this.sum = this.values.slice(0, 3).reduce((a, b) => a + b, 0);
  }

  resetLabelTimeout() {
    if (this.labelTimeout) {
      clearTimeout(this.labelTimeout);
    }

    this.labelTimeout = setTimeout(() => {
      this.isEditing = false;
      this.updateSum();
    }, 1000);
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
