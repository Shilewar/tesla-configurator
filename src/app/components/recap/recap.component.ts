import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarColor, CarModel } from '../../models/car-model/car.model';
import { CarConfig } from '../../models/option-model/option.model';
import { TeslaApiService } from '../../services/api-service/tesla-api.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../shared/services/shared-data/shared-data.service';
import { SelectedModel } from '../../models/selected-model/selected-model';
import { Subscription } from 'rxjs';
import { CarImageComponent } from '../../shared/components/car-image/car-image.component';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [CommonModule, CarImageComponent],
  providers: [TeslaApiService],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.scss',
})
export class RecapComponent implements OnInit, OnDestroy {
  selectedModel: SelectedModel | null = null;
  totalCost: number = 0;
  private selectedModelSubscription: Subscription | undefined;
  selectedImageUrl: string = '';

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.selectedModelSubscription = this.sharedDataService
      .getSelectedModel()
      .subscribe((selectedModel: SelectedModel | null) => {
        if (selectedModel) {
          this.selectedModel = selectedModel;
          this.selectedImageUrl = selectedModel.selectedImageUrl;
          this.calculateTotalCost();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.selectedModelSubscription) {
      this.selectedModelSubscription.unsubscribe();
    }
  }

  calculateTotalCost(): void {
    // Calculate total cost based on selected options
    let totalCost = 0;
    if (this.selectedModel) {
      totalCost += this.selectedModel.selectedColorPrice || 0;
      totalCost += this.selectedModel.selectedModelPrice || 0;
      totalCost += this.selectedModel.selectedTowHitch || 0;
      totalCost += this.selectedModel.selectedYoke || 0;
    }
    this.totalCost = totalCost;
  }
}
