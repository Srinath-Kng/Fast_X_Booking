import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReportsComponent } from './reports/reports.component'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bus-ticket-booking';
}
@NgModule({
  declarations: [
    ReportsComponent,
    ReportsComponent // Declare your ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to imports
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ReportsComponent]
})
export class AppModule { }