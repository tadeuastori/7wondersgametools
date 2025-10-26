// src/app/directives/hammer.directive.ts
import { Directive, ElementRef, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import Hammer from 'hammerjs';

@Directive({
  selector: '[appHammer]'
})
export class HammerDirective implements AfterViewInit, OnDestroy {
  private hammer?: HammerManager;

  // Pan
  @Output() pan = new EventEmitter<HammerInput>();
  @Output() panstart = new EventEmitter<HammerInput>();
  @Output() panmove = new EventEmitter<HammerInput>();
  @Output() panend = new EventEmitter<HammerInput>();
  @Output() panleft = new EventEmitter<void>();
  @Output() panright = new EventEmitter<void>();
  @Output() panup = new EventEmitter<void>();
  @Output() pandown = new EventEmitter<void>();

  // Swipe
  @Output() swipe = new EventEmitter<HammerInput>();
  @Output() swipeleft = new EventEmitter<void>();
  @Output() swiperight = new EventEmitter<void>();
  @Output() swipeup = new EventEmitter<void>();
  @Output() swipedown = new EventEmitter<void>();

  // Tap / Press
  @Output() tap = new EventEmitter<void>();
  @Output() press = new EventEmitter<void>();

  // Pinch / Rotate
  @Output() pinchstart = new EventEmitter<HammerInput>();
  @Output() pinchmove = new EventEmitter<HammerInput>();
  @Output() pinchend = new EventEmitter<HammerInput>();
  @Output() rotatestart = new EventEmitter<HammerInput>();
  @Output() rotatemove = new EventEmitter<HammerInput>();
  @Output() rotateend = new EventEmitter<HammerInput>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.hammer = new Hammer(this.el.nativeElement);

    // Configurar gestos
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
    this.hammer.get('swipe').set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      velocity: 0.1,
      threshold: 20
    });
    this.hammer.get('pinch')?.set({ enable: true });
    this.hammer.get('rotate')?.set({ enable: true });

    // Pan
    this.hammer.on('pan', ev => this.pan.emit(ev));
    this.hammer.on('panstart', ev => this.panstart.emit(ev));
    this.hammer.on('panmove', ev => this.panmove.emit(ev));
    this.hammer.on('panend', ev => this.panend.emit(ev));
    this.hammer.on('panleft', () => this.panleft.emit());
    this.hammer.on('panright', () => this.panright.emit());
    this.hammer.on('panup', () => this.panup.emit());
    this.hammer.on('pandown', () => this.pandown.emit());

    // Swipe
    this.hammer.on('swipe', ev => this.swipe.emit(ev));
    this.hammer.on('swipeleft', () => this.swipeleft.emit());
    this.hammer.on('swiperight', () => this.swiperight.emit());
    this.hammer.on('swipeup', () => this.swipeup.emit());
    this.hammer.on('swipedown', () => this.swipedown.emit());

    // Tap / Press
    this.hammer.on('tap', () => this.tap.emit());
    this.hammer.on('press', () => this.press.emit());

    // Pinch
    this.hammer.on('pinchstart', ev => this.pinchstart.emit(ev));
    this.hammer.on('pinchmove', ev => this.pinchmove.emit(ev));
    this.hammer.on('pinchend', ev => this.pinchend.emit(ev));

    // Rotate
    this.hammer.on('rotatestart', ev => this.rotatestart.emit(ev));
    this.hammer.on('rotatemove', ev => this.rotatemove.emit(ev));
    this.hammer.on('rotateend', ev => this.rotateend.emit(ev));
  }

  ngOnDestroy(): void {
    this.hammer?.destroy();
  }
}
