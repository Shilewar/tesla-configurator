import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectedModel } from '../../../models/selected-model/selected-model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedModelSource = new BehaviorSubject<SelectedModel | null>(null);

  selectedModel$ = this.selectedModelSource.asObservable();

  constructor() { }

  setSelectedModel(selectedModel: SelectedModel): void {
    this.selectedModelSource.next(selectedModel);
  }

  getSelectedModel(): Observable<SelectedModel | null> {
    return this.selectedModel$;
  }
}
