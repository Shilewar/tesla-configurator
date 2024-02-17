import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaApiService } from '../../services/api-service/tesla-api.service';
import { ActivatedRoute } from '@angular/router';
import { CarConfig, CarOption } from '../../models/option-model/option.model';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';
import { SelectedModel } from '../../models/selected-model/selected-model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { StepperService } from '../../shared/services/stepper-service/stepper.service';
import { CarImageComponent } from '../../shared/components/car-image/car-image.component';

@Component({
  selector: 'app-config-options-select',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, CarImageComponent],
  providers: [TeslaApiService],
  templateUrl: './config-options-select.component.html',
  styleUrl: './config-options-select.component.scss',
})
export class ConfigOptionsSelectComponent implements OnInit, OnDestroy {
  modelCode!: string;
  configs: CarConfig[] = [];
  includeYokeAvailable = false;
  includeTowHitchAvailable = false;
  selectedConfig: CarConfig | undefined;
  includeYoke = false;
  includeTowHitch = false;
  selectedModel: SelectedModel = {
    selectedCode: '',
    selectedModelDescription: '',
    selectedColorPrice: 0,
    selectedColor: '',
    selectedConfigDescription: '',
    selectedModelPrice: 0,
    selectedRange: 0,
    selectedSpeed: 0,
    selectedTowHitch: 0,
    selectedYoke: 0,
    selectedImageUrl: ''
  };
  private selectedModelSubscription: Subscription | undefined;
  selectedImageUrl: string = '';
  selectedConfigOption: string = '';

  constructor(
    private route: ActivatedRoute,
    private teslaApiService: TeslaApiService,
    private sharedDataService: SharedDataService,
    private stepperService: StepperService
  ) { }

  ngOnInit(): void {
    this.selectedModelSubscription = this.sharedDataService
      .getSelectedModel()
      .subscribe((selectedModel: SelectedModel | null) => {
        if (selectedModel) {
          this.modelCode = selectedModel.selectedCode;
          this.selectedImageUrl = selectedModel.selectedImageUrl;
          this.updateSelectedModel(selectedModel);
          this.fetchOptions();
        }
      });
    this.onOptionsSelected();
  }

  ngOnDestroy(): void {
    if (this.selectedModelSubscription) {
      this.selectedModelSubscription.unsubscribe();
    }
    this.setSelectedModel();
  }

  onOptionsSelected(): void {
    if (this.selectedConfig) {
      this.stepperService.setStep2CompletionStatus(true);
    } else {
      this.stepperService.setStep2CompletionStatus(false);
    }
  }

  private updateSelectedModel(selectedModel: SelectedModel): void {
    this.selectedModel = { ...selectedModel };
    if (this.selectedConfig) {
      this.selectedModel.selectedConfigDescription =
        this.selectedConfig.description;
      this.selectedModel.selectedModelPrice = this.selectedConfig.price;
      this.selectedModel.selectedRange = this.selectedConfig.range;
      this.selectedModel.selectedSpeed = this.selectedConfig.speed;
      this.selectedModel.selectedTowHitch = this.includeTowHitch ? 1000 : 0;
      this.selectedModel.selectedYoke = this.includeYoke ? 1000 : 0;
    }
  }

  fetchOptions(): void {
    this.teslaApiService.getOptions(this.modelCode).subscribe({
      next: (data: CarOption) => {
        if (data !== null) {
          this.configs = data.configs;
          this.includeYokeAvailable = data.yoke;
          this.includeTowHitchAvailable = data.towHitch;
        } else {
          console.log('Received null data from API');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Error : ' + error.message);
      },
    });
  }

  onConfigChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedConfigOption = '';
    const filteredSelectedModel = this.configs.find(
      (model) => model.description === selectedValue
    );
    this.selectedConfig = Object.assign({}, filteredSelectedModel);
    this.selectedConfigOption = selectedValue;
    this.setSelectedModel();
    this.onOptionsSelected();
  }

  setSelectedModel(): void {
    this.sharedDataService.setSelectedModel(this.selectedModel);
  }
}
