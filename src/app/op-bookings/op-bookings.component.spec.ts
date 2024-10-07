import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpBookingsComponent } from './op-bookings.component';

describe('OpBookingsComponent', () => {
  let component: OpBookingsComponent;
  let fixture: ComponentFixture<OpBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
