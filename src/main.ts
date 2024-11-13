import { bootstrapApplication } from '@angular/platform-browser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

library.add(faTimes);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
