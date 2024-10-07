import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBusesComponent } from './search-buses.component';

describe('SearchBusesComponent', () => {
  let component: SearchBusesComponent;
  let fixture: ComponentFixture<SearchBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
