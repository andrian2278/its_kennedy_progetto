import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComputerComponent } from './info-computer.component';

describe('InfoComputerComponent', () => {
  let component: InfoComputerComponent;
  let fixture: ComponentFixture<InfoComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
