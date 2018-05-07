import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoneComponent } from './lone.component';

describe('LoneComponent', () => {
  let component: LoneComponent;
  let fixture: ComponentFixture<LoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
