import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import 'hammerjs';
// import { register } from 'swiper/element/bundle';

// register();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
