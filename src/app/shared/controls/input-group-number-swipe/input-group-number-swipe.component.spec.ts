import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupNumberSwipeComponent } from './input-group-number-swipe.component';

describe('InputGroupNumberSwipeComponent', () => {
  let component: InputGroupNumberSwipeComponent;
  let fixture: ComponentFixture<InputGroupNumberSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputGroupNumberSwipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGroupNumberSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
