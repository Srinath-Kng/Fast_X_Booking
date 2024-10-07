import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppingPointComponent } from './dropping-point.component';

describe('DroppingPointComponent', () => {
  let component: DroppingPointComponent;
  let fixture: ComponentFixture<DroppingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroppingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroppingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
