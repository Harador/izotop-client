import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailModalComponent } from './country-detail-modal.component';

describe('CountryDetailModalComponent', () => {
  let component: CountryDetailModalComponent;
  let fixture: ComponentFixture<CountryDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
