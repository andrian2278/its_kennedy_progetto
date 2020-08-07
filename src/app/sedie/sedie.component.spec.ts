import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedieComponent } from './sedie.component';

describe('SedieComponent', () => {
  let component: SedieComponent;
  let fixture: ComponentFixture<SedieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
