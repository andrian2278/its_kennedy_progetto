import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSedeComponent } from './component-sede.component';

describe('ComponentSedeComponent', () => {
  let component: ComponentSedeComponent;
  let fixture: ComponentFixture<ComponentSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
