import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ETitleBarAction } from 'src/app/core/enums/title-bar-action.enum';
import { AddPlayerComponent } from '../dialog/add-player/add-player.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-title-bar',
  imports: [MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.less'
})
export class TitleBarComponent {
  @Input() action: ETitleBarAction = ETitleBarAction.NONE;
  @Input() title?: string;
  @Input() textSize?: string;
  @Input() matDialogConfig?: MatDialogConfig<any>;

  @Output() returnAddPlayerDialogEmitted = new EventEmitter<any>();

  readonly dialog = inject(MatDialog);

  eTitleBarAction = ETitleBarAction;

  public openAddPlayerDialog(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.blur();

    const dialogRef = this.dialog.open(AddPlayerComponent, this.matDialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.returnAddPlayerDialogEmitted.emit(result);
      }
    });
  }

  displayTextSize(): string {
    var text = this.textSize ? `title-text-${this.textSize}` : 'title-text-default';
    return text;
  }
}
