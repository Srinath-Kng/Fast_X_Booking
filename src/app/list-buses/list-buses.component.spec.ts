import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusesComponent } from './list-buses.component';

describe('ListBusesComponent', () => {
  let component: ListBusesComponent;
  let fixture: ComponentFixture<ListBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
