import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

@Component({
    selector: 'app-input-group-number-swipe',
    imports: [FormsModule],
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
    this.hideLabel();
    this.values[index]++;
    this.updateSum();
    this.resetLabelTimeout();
  }

  onSwipeRight(index: number) {
    if (this.allowNegative || this.values[index] > 0) {
      this.hideLabel();
      this.values[index]--;
      this.updateSum();
      this.resetLabelTimeout();
    }
  }

  onInputChange(event: any, index: number) {
    const newValue = event.target.valueAsNumber;

    if (Number.isNaN(newValue)) return;

    if (!this.allowNegative || newValue < 0) {
      this.values[index] = Math.max(0, newValue);
      event.target.value = this.values[index];
    }

    this.updateSum();
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
    this.sum = this.values.reduce((a, b) => a + b, 0);
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
}
