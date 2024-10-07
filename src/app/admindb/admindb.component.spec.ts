import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindbComponent } from './admindb.component';

describe('AdmindbComponent', () => {
  let component: AdmindbComponent;
  let fixture: ComponentFixture<AdmindbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
