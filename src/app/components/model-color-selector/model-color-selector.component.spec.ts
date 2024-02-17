import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelColorSelectorComponent } from './model-color-selector.component';

describe('ModelColorSelectorComponent', () => {
  let component: ModelColorSelectorComponent;
  let fixture: ComponentFixture<ModelColorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelColorSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
