import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusopdbComponent } from './busopdb.component';

describe('BusopdbComponent', () => {
  let component: BusopdbComponent;
  let fixture: ComponentFixture<BusopdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusopdbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusopdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
