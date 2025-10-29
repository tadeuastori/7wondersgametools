import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HammerDirective } from 'src/app/core/directives/hammer.directive';

@Component({
    selector: 'app-input-number-swipe',
    imports: [FormsModule, HammerDirective],
    templateUrl: './input-number-swipe.component.html',
    styleUrl: './input-number-swipe.component.less'
})
export class InputNumberSwipeComponent implements OnInit {
  @Input({ required: true }) valueStage!: number;
  @Input() score: number = 0;
  @Input() allowNegative: boolean = false;
  @Input() allowPositive: boolean = true;
  @Input() maximumPositiveNumber: number = 0;
  @Input() minimumNegativeNumber: number = 0;
  @Input() displaySum: boolean = false;
  @Input() displaySingleNumber: boolean = false;
  @Input() isReadonly: boolean = false
  @Output() valuesChanged = new EventEmitter<number>();

  isEditing: boolean = false;
  private labelTimeout: any;

  visibleNumbers: number[] = [];
  MAX_DRAG = 50; 
  range = 19;
  lastPanX = 0;
  currentOffset = 0;
  activeIndex = 0; 
  CENTER_INDEX = 0;

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

  ngOnInit(): void {
    this.updateVisibleNumbers();
  }

  onPan(event: any, index?: number) {

    if(this.isReadonly) return

    this.hideLabel();
    const delta = event.deltaX;
  
    const nextOffset = this.currentOffset + delta;

    const partialShift = (nextOffset / this.MAX_DRAG);

    let currentValue = this.valueStage as number;

    const predictedValue = (currentValue - partialShift);

    // **REGRA DE BLOQUEIO NEGATIVO**
    if (
      delta > 0 && 
        (
          (!this.allowNegative && (currentValue === 0 || predictedValue <= 0)) ||
          (this.allowNegative && this.minimumNegativeNumber > 0  && (currentValue === -this.minimumNegativeNumber || predictedValue <= -this.minimumNegativeNumber))
        )
      ) {
      return; // não move
    }

    // **REGRA DE BLOQUEIO POSITIVO**
    if (
      delta < 0 && 
      (
        (!this.allowPositive && (currentValue === 0 || predictedValue >= 0)) ||
        (this.allowPositive && this.maximumPositiveNumber > 0 && (currentValue === this.maximumPositiveNumber || predictedValue >= this.maximumPositiveNumber))
      )
    ) {
      return; // não move
    }

    const el = event.target.closest('.input-carousel-content');
    el.style.transition = 'none';

    el.style.transform = `translateX(${nextOffset}px)`;

    this.activeIndex = Math.round(this.CENTER_INDEX - partialShift);
    this.activeIndex = Math.max(0, Math.min(this.visibleNumbers.length - 1, this.activeIndex));
    this.lastPanX = delta;
  }

  onPanEnd(event: any) {

    if(this.isReadonly) return

    const total = this.currentOffset + this.lastPanX;

    let shift = -Math.round(total / this.MAX_DRAG);

    if (shift !== 0) {
      this.applyShift(shift);
    }

    const el = event.target.closest('.input-carousel-content');
    el.style.transform = `translateX(0px)`;

    this.currentOffset = 0;
    this.lastPanX = 0;
    this.activeIndex = this.CENTER_INDEX;
    
    this.resetLabelTimeout(); 
    event.target.blur();
  }

  applyShift(shift: number) {
    let newValue = (this.valueStage as number) + shift;

    if (this.maximumPositiveNumber > 0) {
      newValue = Math.min(newValue, this.maximumPositiveNumber);
    }
    if (!this.allowNegative) {
      newValue = Math.max(newValue, 0);
    }
    if (this.minimumNegativeNumber < 0) {
      newValue = Math.max(newValue, this.minimumNegativeNumber);
    }   

    this.valueStage = newValue;    
    this.updateVisibleNumbers();    
  }

  updateVisibleNumbers() {
    this.visibleNumbers = [];

    for (let i = -this.range; i <= this.range; i++) {
      this.visibleNumbers.push((this.valueStage as number) + i);
    }

    this.CENTER_INDEX = Math.floor(this.visibleNumbers.length / 2);

    this.valuesChanged.emit(this.valueStage);
  }

  onInputChange(event: any) {
    const newValue = event.target.valueAsNumber;

    if (Number.isNaN(newValue)) return;

    if (this.allowNegative || newValue >= 0) {
      this.valueStage = newValue;
      this.updateVisibleNumbers();
    } else {
      this.valueStage = Math.max(0, newValue);
      event.target.value = this.valueStage;
    }
  }

  onInputFocus(event: any) {
    this.isEditing = true;
    event.target.select();
  }

  onInputBlur() {
    this.valuesChanged.emit(this.valueStage);
    this.resetLabelTimeout();
  }
}
