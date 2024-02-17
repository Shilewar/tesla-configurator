import { Routes } from '@angular/router';
import { ModelColorSelectorComponent } from './components/model-color-selector/model-color-selector.component';
import { ConfigOptionsSelectComponent } from './components/config-options-select/config-options-select.component';
import { RecapComponent } from './components/recap/recap.component';
import { StepGuardService } from './shared/services/stepperAuthGuard/step-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'step1', pathMatch: 'full' },
    { path: 'step1', component: ModelColorSelectorComponent },
    { path: 'step2', component: ConfigOptionsSelectComponent, canActivate: [StepGuardService] },
    { path: 'step3', component: RecapComponent, canActivate: [StepGuardService] },
];
