import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPlayerMatchComponent } from './dialog-add-player-match.component';

describe('DialogAddPlayerMatchComponent', () => {
  let component: DialogAddPlayerMatchComponent;
  let fixture: ComponentFixture<DialogAddPlayerMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddPlayerMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddPlayerMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
