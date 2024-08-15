import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

@Component({
  selector: 'app-input-number-swipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-number-swipe.component.html',
  styleUrl: './input-number-swipe.component.less',
})
export class InputNumberSwipeComponent implements OnInit {
  @Input() value: number = 0;
  @Input() allowNegative: boolean = true;
  visibleNumbers: number[] = [];

  ngOnInit(): void {
    this.updateVisibleNumbers();
  }

  onSwipeLeft() {
    if (this.allowNegative || this.value >= 0) {
      this.value++;
      this.updateVisibleNumbers();
    }
  }

  onSwipeRight() {
    if (this.allowNegative || this.value > 0) {
      this.value--;
      this.updateVisibleNumbers();
    }
  }

  updateVisibleNumbers() {
    this.visibleNumbers = [this.value - 1, this.value, this.value + 1];
  }

  onInputChange(event: any) {
    const newValue = event.target.valueAsNumber;

    if (Number.isNaN(newValue)) return;

    if (this.allowNegative || newValue >= 0) {
      this.value = newValue;
      this.updateVisibleNumbers();
    } else {
      this.value = Math.max(0, newValue);
      event.target.value = this.value;
    }
  }

  onInputFocus(event: any) {
    event.target.select();
  }
}
