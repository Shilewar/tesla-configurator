import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private step1CompletedSubject = new BehaviorSubject<boolean>(false);
  private step2CompletedSubject = new BehaviorSubject<boolean>(false);
  private step3CompletedSubject = new BehaviorSubject<boolean>(false);

  step1Completed$ = this.step1CompletedSubject.asObservable();
  step2Completed$ = this.step2CompletedSubject.asObservable();
  step3Completed$ = this.step3CompletedSubject.asObservable();

  setStep1CompletionStatus(completed: boolean): void {
    this.step1CompletedSubject.next(completed);
  }

  setStep2CompletionStatus(completed: boolean): void {
    this.step2CompletedSubject.next(completed);
  }

  setStep3CompletionStatus(completed: boolean): void {
    this.step3CompletedSubject.next(completed);
  }

  isStep1Complete(): boolean {
    return this.step1CompletedSubject.value;
  }

  isStep2Complete(): boolean {
    return this.step2CompletedSubject.value;
  }

  isStep3Complete(): boolean {
    return this.step3CompletedSubject.value;
  }

}
