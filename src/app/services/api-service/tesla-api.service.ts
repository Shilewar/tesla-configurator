import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarOption } from '../../models/option-model/option.model';
import { CarModel } from '../../models/car-model/car.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  private optionsUrl = '/options';
  private modelsUrl = '/models';

  constructor(private http: HttpClient) { }

  getOptions(modelCode: string): Observable<CarOption> {
    return this.http.get<CarOption>(`${this.optionsUrl}/${modelCode}`);
  }

  getModels(): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.modelsUrl}`);
  }
}
