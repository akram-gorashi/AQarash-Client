import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVehicleComponent } from './search-vehicle.component';

describe('SearchVehicleComponent', () => {
  let component: SearchVehicleComponent;
  let fixture: ComponentFixture<SearchVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
