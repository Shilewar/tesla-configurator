import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StepperComponent } from "./components/stepper/stepper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AsyncPipe, JsonPipe, HttpClientModule, RouterModule, StepperComponent]
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}
