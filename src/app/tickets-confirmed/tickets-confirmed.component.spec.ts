import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsConfirmedComponent } from './tickets-confirmed.component';

describe('TicketsConfirmedComponent', () => {
  let component: TicketsConfirmedComponent;
  let fixture: ComponentFixture<TicketsConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsConfirmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
