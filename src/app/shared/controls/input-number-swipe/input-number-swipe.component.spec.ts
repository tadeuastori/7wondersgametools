import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberSwipeComponent } from './input-number-swipe.component';

describe('InputNumberSwipeComponent', () => {
  let component: InputNumberSwipeComponent;
  let fixture: ComponentFixture<InputNumberSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberSwipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNumberSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
