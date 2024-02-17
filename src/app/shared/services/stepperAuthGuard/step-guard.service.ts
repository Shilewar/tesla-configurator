import { Injectable } from '@angular/core';
import { StepperService } from '../stepper-service/stepper.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StepGuardService {
  constructor(private stepperService: StepperService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentStep = parseInt(route.url[0].path.replace('step', ''), 10);

    if (currentStep === 1) {
      return true; // Allow access to step 1
    } else if (currentStep === 2) {
      // Check if step 1 is completed
      if (this.stepperService.isStep1Complete()) {
        return true; // Allow access to step 2
      } else {
        this.router.navigate(['/step1']); // Redirect to step 1 if step 1 is not completed
        return false;
      }
    } else if (currentStep === 3) {
      // Check if step 1 and step 2 are completed
      if (this.stepperService.isStep1Complete() && this.stepperService.isStep2Complete()) {
        return true; // Allow access to step 3
      } else {
        this.router.navigate(['/step2']); // Redirect to step 2 if step 1 or step 2 is not completed
        return false;
      }
    }
    return true; // For other steps, allow access
  }
}
