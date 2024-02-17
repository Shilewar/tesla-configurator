import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';
import { SelectedModel } from '../../models/selected-model/selected-model';
import { StepperService } from '../../shared/services/stepper-service/stepper.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  step = 1;
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;

  constructor(private router: Router, public stepperService: StepperService) { }

  ngOnInit(): void {
    this.stepperService.step1Completed$.subscribe(completed => {
      this.step1Completed = completed;
      this.updateStepCompletion();
    });

    this.stepperService.step2Completed$.subscribe(completed => {
      this.step2Completed = completed;
      this.updateStepCompletion();
    });

    this.stepperService.step3Completed$.subscribe(completed => {
      this.step3Completed = completed;
      this.updateStepCompletion();
    });

  }

  navigateToStep(step: number): void {
    this.router.navigate([`/step${step}`]);
    this.step = step;
  }

  private updateStepCompletion(): void {
    if (this.step1Completed && !this.step2Completed) {
      this.step = 2;
    } else if (this.step2Completed && !this.step3Completed) {
      this.step = 3;
    }
  }
}
