import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudenteComponent } from './info-studente.component';

describe('InfoStudenteComponent', () => {
  let component: InfoStudenteComponent;
  let fixture: ComponentFixture<InfoStudenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStudenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
