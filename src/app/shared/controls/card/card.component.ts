import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less'
})
export class CardComponent {  
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() footer: string = '';
  @Input() buttons: string = '';
  @Input() textLeft: string = '';
  @Input() textRight: string = 'Last played 2025-10-13';
  @Input() hasDelete: boolean = false;
  @Input() index: string | number= '';

  @Output() deleteItemEmitted = new EventEmitter<string | number>();
  @Output() openItemEmitted = new EventEmitter<string | number>();

  deleteItem(idx: string | number): void {
    this.deleteItemEmitted.emit(idx);
  }

  openItem(idx: string | number): void {
    this.openItemEmitted.emit(idx);
  }

}
