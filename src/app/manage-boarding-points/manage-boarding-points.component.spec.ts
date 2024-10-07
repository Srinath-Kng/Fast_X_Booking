import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoardingPointsComponent } from './manage-boarding-points.component';

describe('ManageBoardingPointsComponent', () => {
  let component: ManageBoardingPointsComponent;
  let fixture: ComponentFixture<ManageBoardingPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBoardingPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoardingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
