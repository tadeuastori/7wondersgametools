import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageTableComponent } from './stage-table.component';

describe('StageTableComponent', () => {
  let component: StageTableComponent;
  let fixture: ComponentFixture<StageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
