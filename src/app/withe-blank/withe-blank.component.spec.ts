import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitheBlankComponent } from './withe-blank.component';

describe('WitheBlankComponent', () => {
  let component: WitheBlankComponent;
  let fixture: ComponentFixture<WitheBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitheBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitheBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
