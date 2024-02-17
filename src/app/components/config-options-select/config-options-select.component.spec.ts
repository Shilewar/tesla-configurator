import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionsSelectComponent } from './config-options-select.component';

describe('ConfigOptionsSelectComponent', () => {
  let component: ConfigOptionsSelectComponent;
  let fixture: ComponentFixture<ConfigOptionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigOptionsSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigOptionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
