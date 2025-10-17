import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-page',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.less'
})
export class LoadingPageComponent {

}
