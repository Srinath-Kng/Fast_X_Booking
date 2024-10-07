import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import  {ReactiveFormsModule} from '@angular/forms';
import { provideRouter } from '@angular/router';
import {routes} from'./app/app.routes';
bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule, // Import HttpClientModule here
    provideHttpClient(),
    provideRouter(routes),
  ],
});
