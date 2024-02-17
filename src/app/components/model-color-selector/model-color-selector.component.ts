import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CarModel, CarColor } from '../../models/car-model/car.model';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';
import { SelectedModel } from '../../models/selected-model/selected-model';
import { CommonModule } from '@angular/common';
import { TeslaApiService } from '../../services/api-service/tesla-api.service';
import { StepperService } from '../../shared/services/stepper-service/stepper.service';
import { CarImageComponent } from '../../shared/components/car-image/car-image.component';

@Component({
  selector: 'app-model-color-selector',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CarImageComponent],
  providers: [TeslaApiService],
  templateUrl: './model-color-selector.component.html',
  styleUrl: './model-color-selector.component.scss',
})
export class ModelColorSelectorComponent implements OnInit {
  models: CarModel[] = [];
  selectedModelsArray: CarModel[] = [];
  colors: CarColor[] = [];
  selectedModel: string = '';
  selectedColor: string = '';
  selectedImageUrl: string = '';

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private teslaApiService: TeslaApiService,
    private stepperService: StepperService,
  ) { }

  ngOnInit(): void {
    this.fetchModels();
    this.onInputsFilled();
  }

  fetchModels(): void {
    this.teslaApiService.getModels().subscribe({
      next: (data: CarModel[] | CarModel) => {
        if (Array.isArray(data)) {
          this.models = data;
        } else if (data !== null) {
          // Handle a single CarModel
          this.models = [data];
        } else {
          console.log('Received null data from API');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Error : ' + error.message);
      },
    });
  }

  onInputsFilled(): void {
    if (this.selectedModel || this.selectedColor) {
      this.stepperService.setStep1CompletionStatus(true);
    } else {
      this.stepperService.setStep1CompletionStatus(false);
    }
  }

  onModelChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const filteredSelectedModel = this.models.find(
      (model) => model.description === selectedValue
    );
    if (filteredSelectedModel) {
      this.selectedModelsArray = [filteredSelectedModel];
    }
    this.selectedModel = selectedValue;
    this.selectedColor = '';
    if (filteredSelectedModel) {
      this.colors = filteredSelectedModel.colors || [];
      if (this.colors.length > 0) {
        this.selectedColor = this.colors[0].description;
        this.updateImageUrl(filteredSelectedModel.code, this.colors[0].code);
      }
    } else {
      this.colors = [];
      this.selectedColor = '';
      this.selectedImageUrl = '';
    }
  }

  onColorChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    const filteredSelectedColor = this.colors.find(
      (color) => color.description === selectedValue
    );
    this.selectedColor = selectedValue;
    if (filteredSelectedColor) {
      this.updateImageUrl(
        this.selectedModelsArray[0].code,
        filteredSelectedColor.code
      );
    }
  }

  private updateImageUrl(modelCode: string, colorCode: string): void {
    if (modelCode && colorCode) {
      this.selectedImageUrl = `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`;
      this.setSelectedModel();
      this.onInputsFilled();
    } else {
      this.selectedImageUrl = '';
    }
  }

  private setSelectedModel(): void {
    const selectedModel = this.models.find(
      (model) => model.description === this.selectedModel
    );
    const selectedColor = this.colors.find(
      (color) => color.description === this.selectedColor
    );
    if (selectedModel && selectedColor) {
      const _selectedModel: SelectedModel = {
        selectedCode: selectedModel.code,
        selectedModelDescription: this.selectedModel,
        selectedColor: this.selectedColor,
        selectedConfigDescription: '',
        selectedModelPrice: 0,
        selectedColorPrice: selectedColor.price || 0,
        selectedRange: 0,
        selectedSpeed: 0,
        selectedTowHitch: 0,
        selectedYoke: 0,
        selectedImageUrl: this.selectedImageUrl
      };
      this.sharedDataService.setSelectedModel(_selectedModel);
    }
  }
}
